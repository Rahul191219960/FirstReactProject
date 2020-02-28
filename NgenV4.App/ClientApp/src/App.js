import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import config from './config'
import { fetchModels } from './utils/moMa'
import Spinner from './components/shell/Spinner'
import Nav from './components/shell/Nav.js';
import TopBar from './components/shell/TopBar.js';
import Footer from './components/shell/Footer.js';
import Home from './components/pages/Home.js';
import Demo from './components/pages/Demo.js';
import List from './components/views/many/List';
import Cards from './components/views/many/Cards';
import Charts from './components/views/charts/Charts';
import Stats from './components/views/many/Stats';
import Browse from './components/views/one/Browse';
import Edit from './components/views/one/Edit';
import Login from './components/pages/Login';
import Api from './components/views/doc/Api';
import PageNotFound from './components/pages/PageNotFound.js';
import 'react-toastify/dist/ReactToastify.min.css';
import MetisMenu from 'react-metismenu';
import AppMenus from '../src/AppMenus';
import './metis.scss';
import ZenMenu from './components/ZenMenu/ZenMenu';
import ZenMenuMobile from './components/ZenMenu/ZenMenuMobile';

import todo from './JavaScripts/todo';
import aircraft from './JavaScripts/aircraft'

// import Sample4 from './components/custom_page/sample4/Sample4';
import Simualtion from './components/custom_page/Simulation/Simulation';
import Sample4 from './components/custom_page/Sample4/Sample4';
import Sample2_IndexView from './components/custom_page/Sample2/Sample2_IndexView';
import Sample2_New from './components/custom_page/Sample2/Sample2_New';
import Sample4_IndexView from './components/custom_page/Sample4/Sample4_indexView';
import Sample2_Read from './components/custom_page/Sample2/Sample2_Read';
import Permission from './components/custom_page/Permission/Permission';

let queryModels = config.queryModels || false

const AppRoutes = (props) => {
	const loggedIn = props.loggedIn
	return (
		<Switch>
			{/* Custom Pages Here */}
			<Route path="/permission" exact={true} component={Permission} />
			<Route path="/simulation" exact={true} component={Simualtion} />
			<Route path="/sample2/list" exact={true} component={Sample2_IndexView} />
			<Route path="/sample4/list" exact={true} component={Sample4_IndexView} />
			<Route path="/sample2/edit/:id" exact={true} component={Sample2_New} />
			<Route path="/sample2/browse/:id" exact={true} component={Sample2_Read} />
			<Route path="/sample2/delete/:id" exact={true} component={Sample2_Read} />
			<Route path="/sample4/edit/:id" exact={true} component={Sample4} />

			{/* Model Pages Here */}
			<Route exact path="/login" render={(props) => <Login loggedIn={loggedIn} />} />
			<Route exact path="/" component={Home} />
			<Route exact path="/home" component={Home} />
			<Route path="/:entity" exact={true} component={List} />
			<Route path="/:entity/browse/:id" component={Browse} />
			<Route path="/:entity/browse" component={Browse} />
			<Route path="/:entity/delete/:id" component={Browse} />
			<Route path="/:entity/edit/:id" component={Edit} />
			<Route path="/:entity/edit" component={Edit} />
			<Route path="/:entity/todo/:id" component={todo} />
			<Route path="/:entity/aircraft" component={aircraft} />
			<Route path="/:entity/cards" component={Cards} />
			<Route path="/:entity/list" component={List} />
			<Route path="/:entity/charts" component={Charts} />
			<Route path="/:entity/stats" component={Stats} />
			<Route path="/:entity/api" component={Api} />
			<Route path='*' exact={true} component={PageNotFound} />
		</Switch>
	)
}

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: queryModels,
			loggedIn: false
		}
	}

	componentWillMount() {
		const token = localStorage.getItem("token");
		var status = true;
		if (token == null) {
			status = false;
		}
		this.setState({
			loggedIn: status
		});
	}

	componentDidMount() {
		if (queryModels) {
			fetchModels(
				() => this.setState({
					loading: false,
				}),
				err => {
					this.setState({
						loading: false,
					})
					toast.error('Error fetching models: ' + err.message)
				}
			)
			queryModels = false
		}
	}

	render() {

		if (this.state.loggedIn == false) {
			return (
				<div>
					<BrowserRouter>
						<Link to="/login" component={Login}></Link>
					</BrowserRouter>
				</div>
			)
		} else {
			return (
				<div className="App">
					{this.state.loading ? (
						<div className="loading-cf">
							<Spinner message="Fetching UI models..."></Spinner>
						</div>
					) : (
							<BrowserRouter>
								<ZenMenuMobile menuData={AppMenus} appTitle={`ZenMenu`} />
								<ZenMenu menuData={AppMenus} appTitle={`ZenMenu`} />
								<div id="pageContent" className="zen-page-content partial-padding-left" role="main">
									<TopBar menuRef={this.menuRef} />
									<div className="content-card-padding">
										<div id="pageContentWrapper" className="page-content-wrapper page-content-wrapper-padding">
											<AppRoutes loggedIn={this.state.loggedIn} />
										</div>
									</div>
								</div>
								<ToastContainer autoClose={5000} />
							</BrowserRouter>
						)}
				</div>
			)
		}
	}
}

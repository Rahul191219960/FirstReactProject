using System;
using System.Collections.Generic;
using System.Text;

namespace NgenV4.ViewModel.Common
{
    public class DataSourceRequestViewModel
    {
        public DataSourceRequestViewModel()
        {
            GridRows = new List<GridFilterRowViewModel>();
            GroupList = new List<SearchGroupViewModel>();
        }

        public string QueryString { get; set; }
        public List<GridFilterRowViewModel> GridRows { get; set; }
        public List<SearchGroupViewModel> GroupList { get; set; }
        public dynamic ExtraData { get; set; }
    }

    public class GridFilterRowViewModel
    {
        public string rowid { get; set; }
        public string andOr { get; set; }
        public string field { get; set; }
        public string _operator { get; set; }
        public string value { get; set; }
        public bool groupChecked { get; set; }
    }

    public class SearchGroupViewModel
    {
        public SearchGroupViewModel()
        {
            valueList = new List<string>();
            subGroups = new List<SearchGroupViewModel>();
        }

        public string groupId { get; set; }
        public List<string> valueList { get; set; }
        public List<SearchGroupViewModel> subGroups { get; set; }
        public string _operator { get; set; }
    }
}

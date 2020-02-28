using AutoMapper;
using NgenV4.Domain;
using NgenV4.Domain.Entities;
using NgenV4.ViewModel;
using NgenV4.ViewModel.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NgenV4.Service
{
    public class GridOperations
    {
        public static void ProcessFilter(AutoCompleteFilterViewModel filter, ref string queryable)
        {
            var whereClause = string.Empty;
            var filters = filter.Filters;
            var parameters = new List<object>();
            for (int i = 0; i < filters.Count; i++)
            {
                AutoCompleteFilterViewModel f = filters[i];

                if (f.Filters == null)
                {
                    if (i == 0)
                        whereClause += (queryable != "" ? ToLinqOperator(filter.Logic) + "(" : "(") + BuildWherePredicate(f, parameters) + " ";
                    if (i != 0)
                        whereClause += ToLinqOperator(filter.Logic) + BuildWherePredicate(f, parameters) + " ";
                    if (i == (filters.Count - 1))
                    {
                        TrimWherePredicate(ref whereClause);
                        queryable = queryable + whereClause + ")";
                    }
                }
                else
                    ProcessFilter(f, ref queryable);
            }
        }
        public static void DefaultFilter(AutoCompleteFilterViewModel filter, ref string queryable)
        {
            var whereClause = string.Empty;
            var parameters = new List<object>();

            if (filter.Filters == null)
            {
                whereClause += (queryable != "" ? ToLinqOperator("AND") + "(" : "(") + BuildWherePredicate(filter, parameters) + " ";
                TrimWherePredicate(ref whereClause);
                queryable = queryable + whereClause + ")";
            }
        }
        private static string ToLinqOperator(string Operator)
        {
            switch (Operator.ToLower())
            {
                case "eq": return " = ";
                case "neq": return " != ";
                case "gte": return " >= ";
                case "gt": return " > ";
                case "lte": return " <= ";
                case "lt": return " < ";
                case "or": return " or  ";
                case "and": return " and ";
                default: return null;
            }
        }
        private static string BuildWherePredicate(AutoCompleteFilterViewModel filter, List<object> parameters)
        {
            var parameterIndex = parameters.Count;
            switch (filter.Operator.ToLower())
            {
                case "eq":
                case "neq":
                case "gte":
                case "gt":
                case "lte":
                case "lt":
                    DateTime date;
                    if (DateTime.TryParse(filter.Value, out date))
                    {
                        parameters.Add(date.Date.ToString("yyyy-MM-dd"));
                        return String.Format("[" + filter.Field + "]" + ToLinqOperator(filter.Operator) + "'" + parameters[parameterIndex] + "'");
                    }
                    int number;
                    if (int.TryParse(filter.Value, out number))
                    {
                        parameters.Add(filter.Value);
                        return String.Format("[" + filter.Field + "]" + ToLinqOperator(filter.Operator) + "'" + parameters[parameterIndex] + "'");
                    }

                    if (!String.IsNullOrEmpty(filter.Value) && filter.Value.StartsWith("'") && filter.Value.EndsWith("'"))
                        parameters.Add(filter.Value.Substring(1, filter.Value.Length - 2));
                    else
                        parameters.Add(filter.Value);

                    return String.Format(filter.Field + ToLinqOperator(filter.Operator) + "'" + parameters[parameterIndex] + "'");
                case "startswith":
                    parameters.Add(filter.Value);
                    string[] startswithFilterArray = filter.Field.Split(',');
                    string startswithFilter = "";
                    foreach (string str in startswithFilterArray)
                    {
                        startswithFilter = (startswithFilter == "" ? "" : startswithFilter + "+'-'+") + "CAST(" + "[" + str + "]" + " AS VARCHAR(MAX))"; //(startswithFilter == "" ? "" : startswithFilter + "+'-'+") + "[" + str + "]";
                    }
                    return startswithFilter + " like '" + parameters[parameterIndex] + "%'";
                case "endswith":
                    parameters.Add(filter.Value);
                    string[] endswithFilterArray = filter.Field.Split(',');
                    string endswithFilter = "";
                    foreach (string str in endswithFilterArray)
                    {
                        endswithFilter = (endswithFilter == "" ? "" : endswithFilter + "+'-'+") + "CAST(" + "[" + str + "]" + " AS VARCHAR(MAX))"; //(endswithFilter == "" ? "" : endswithFilter + "+'-'+") + "[" + str + "]";
                    }
                    return endswithFilter + " like '%" + parameters[parameterIndex] + "'";
                case "contains":
                    parameters.Add(filter.Value);
                    string[] containFilterArray = filter.Field.Split(',');
                    string containFilter = "";
                    foreach (string str in containFilterArray)
                    {
                        containFilter = (containFilter == "" ? "" : containFilter + "+'-'+") + "CAST(" + "[" + str + "]" + " AS VARCHAR(MAX))";
                    }
                    return containFilter + " like '%" + parameters[parameterIndex] + "%'";
                case "in":
                    parameters.Add(filter.Value);
                    string[] innFilterArray = filter.Field.Split(',');
                    string inFilter = "";
                    foreach (string str in innFilterArray)
                    {
                        if (str.ToLower() == "sno")
                            inFilter = (inFilter == "" ? "" : inFilter + "+'-'+") + str;
                        else
                            inFilter = (inFilter == "" ? "" : inFilter + "+'-'+") + "CAST(" + "[" + str + "]" + " AS VARCHAR(MAX))";
                    }
                    return inFilter + " IN ('" + parameters[parameterIndex].ToString().Replace(",", "','") + "')";
                case "notin":
                    parameters.Add(filter.Value);
                    string[] notinnFilterArray = filter.Field.Split(',');
                    string notinFilter = "";
                    foreach (string str in notinnFilterArray)
                    {
                        if (str.ToLower() == "sno")
                            notinFilter = (notinFilter == "" ? "" : notinFilter + "+'-'+") + str;
                        else
                            notinFilter = (notinFilter == "" ? "" : notinFilter + "+'-'+") + "CAST(" + "[" + str + "]" + " AS VARCHAR(MAX))";
                    }
                    return notinFilter + " NOT IN ('" + parameters[parameterIndex].ToString().Replace(",", "','") + "')";
                default:
                    throw new ArgumentException("This operator is not yet supported for this Grid", filter.Operator);
            }
        }

        private static string TrimWherePredicate(ref string whereClause)
        {
            switch (whereClause.Trim().Substring(0, 2).ToLower())
            {
                case "&&":
                    whereClause = whereClause.Trim().Remove(0, 2);
                    break;
                case "||":
                    whereClause = whereClause.Trim().Remove(0, 2);
                    break;
            }

            return whereClause;
        }
    }
}
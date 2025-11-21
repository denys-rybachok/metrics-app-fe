import moment from "moment";

export const getDatesForPeriod = (p: string) => {
  switch (p) {
    case "currentWeek":
      return {
        startDate: moment().startOf("week").toISOString(),
        endDate: moment().endOf("week").toISOString(),
      };
    case "lastWeek":
      return {
        startDate: moment().subtract(1, "week").startOf("week").toISOString(),
        endDate: moment().subtract(1, "week").endOf("week").toISOString(),
      };
    case "currentMonth":
      return {
        startDate: moment().startOf("month").toISOString(),
        endDate: moment().endOf("month").toISOString(),
      };
    case "lastMonth":
      return {
        startDate: moment().subtract(1, "month").startOf("month").toISOString(),
        endDate: moment().subtract(1, "month").endOf("month").toISOString(),
      };
    case "currentQuarter":
      return {
        startDate: moment().startOf("quarter").toISOString(),
        endDate: moment().endOf("quarter").toISOString(),
      };
    case "lastQuarter":
      return {
        startDate: moment()
          .subtract(1, "quarter")
          .startOf("quarter")
          .toISOString(),
        endDate: moment().subtract(1, "quarter").endOf("quarter").toISOString(),
      };
    default:
      return {
        startDate: moment().startOf("week").toISOString(),
        endDate: moment().endOf("week").toISOString(),
      };
  }
};

export const useStorage = () => {
  const loadLog = (appName) => {
    let loadData = {
      app: appName,
      latestUpdate: new Date().getTime(),
      logs: [],
    }
    // console.log(JSON.parse(localStorage.getItem(appName)).logs);
    if (
      localStorage.getItem(appName) &&
      JSON.parse(localStorage.getItem(appName)).logs &&
      JSON.parse(localStorage.getItem(appName)).logs.filter(
        (log) => log && log.startTime,
      )
    ) {
      loadData = {
        app: appName,
        latestUpdate: new Date().getTime(),
        logs: JSON.parse(localStorage.getItem(appName))
          .logs.filter((log) => log && log.startTime)
          .sort((a, b) => parseInt(b.startTime) - parseInt(a.startTime)),
      }
      // console.log(loadData)
    }
    return loadData
  }
  const saveLog = (appName, newLog) => {
    let savingData = {
      app: appName,
      latestUpdate: new Date().getTime(),
      logs: [],
    }
    if (
      loadLog(appName).logs &&
      loadLog(appName).logs.find((log) => {
        if (log && log.startTime) {
          return log.startTime === newLog.startTime
        }
        return false
      }) !== undefined
    ) {
      savingData.logs = loadLog(appName).logs.reduce(
        (prevLog, curLog, index) => {
          // console.log(newLog, curLog);
          if (
            curLog &&
            curLog.startTime &&
            curLog.startTime === newLog.startTime
          ) {
            // console.log('nextQuestion:', newLog);
            return [...prevLog, newLog]
          }
          return [...prevLog, curLog]
        },
        [],
      )
    } else if (loadLog(appName).logs) {
      savingData.logs = [newLog, ...loadLog(appName).logs]
    } else {
      savingData.logs = [newLog]
    }
    localStorage.setItem(appName, JSON.stringify(savingData))
    // console.log(localStorage.getItem(appName));
  }
  return {
    loadLog,
    saveLog,
  }
}

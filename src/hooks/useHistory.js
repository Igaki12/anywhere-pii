import { useState } from 'react'

export const useHistory = () => {
  const [history, setHistory] = useState([
    {
      askedQuestionList: [],
      askingQuestion: {},
      remainingQuestionList: [],
      isAnswered: false,
      questionNum: 0,
    },
  ])
  const showHistory = () => {
    return history
  }
  const loadHistory = (savedStrHistory, questionList) => {
    let newHistory = history[history.length - 1]

    const savedArrayHistory = savedStrHistory.split(',')
    newHistory.questionNum = parseInt(savedArrayHistory[0])
    newHistory.remainingQuestionList = []
    savedArrayHistory.splice(1).forEach((savedId, index) => {
      if (newHistory.askedQuestionList.length > 0) {
        console.log(newHistory)
        newHistory.forEach((question) => {
          if (question.id === savedId) {
            console.log(
              '被った問題が既に出題されているため、出題から省きました',
            )
            return
          }
        })
      }
      if (index > 1) {
        savedArrayHistory.splice(1, index - 1).forEach((comparedId) => {
          if (savedId === comparedId) {
            console.log('保存されたIDが重複していました。:' + comparedId)
            return
          }
        })
      }
      let addingQuestion = {}
      addingQuestion.id = savedId
      console.log('addingQUestion.id:' + addingQuestion.id)
      let savedGroupId = Math.floor(parseInt(savedId.replace('r', '')) / 1000)
      let savedContentsId = parseInt(savedId.replace('r', '')) % 1000
      if (
        // id > 999999 &&
        questionList[savedGroupId].groupContents[savedContentsId]
      ) {
        questionList[savedGroupId].groupContents[
          savedContentsId
        ].id = savedId.toString()

        if (
          !questionList[savedGroupId].groupContents[savedContentsId].detailInfo
        ) {
          questionList[savedGroupId].groupContents[savedContentsId].detailInfo =
            '(' + (savedContentsId + 1).toString() + ')'
        }

        addingQuestion =
          questionList[savedGroupId].groupContents[savedContentsId]
        addingQuestion.groupTag = questionList[savedGroupId].groupTag
      }
      if (addingQuestion.choices) {
        if (addingQuestion.answer === '') {
          addingQuestion.answer = addingQuestion.choices[0]
        }
        // 選択肢をランダムに配置
        let choiceList = [...addingQuestion.choices]
        addingQuestion.randomizedChoices = []
        for (let i = 0; i < addingQuestion.choices.length; i++) {
          addingQuestion.randomizedChoices.push(
            choiceList.splice(Math.floor(Math.random() * choiceList.length), 1),
          )
        }
      }
      if (addingQuestion.questionSentence) {
        newHistory.remainingQuestionList.push(addingQuestion)
      } else {
        console.log(
          '保存されたIDに対応する問題が見つかりませんでした:' + savedId,
        )
      }
    })
    setHistory([...history, newHistory])
  }
  const selectQuestionList = (questionList, settingDetail) => {
    let newHistory = history[history.length - 1]
    newHistory.remainingQuestionList = []
    questionList.forEach((group, groupIndex) => {
      if (settingDetail.questionRange.indexOf(group.groupTag) === -1) {
        return
      }
      group.groupContents.forEach((question, questionIndex) => {
        let newRemainingQuestion = question
        newRemainingQuestion.id = (groupIndex * 1000 + questionIndex).toString()
        newRemainingQuestion.groupTag = group.groupTag
        if (!newRemainingQuestion.detailInfo) {
          newRemainingQuestion.detailInfo =
            '(' + (questionIndex + 1).toString() + ')'
        }

        if (newRemainingQuestion.askedQuestionList) {
          if (
            newRemainingQuestion.askedQuestionList.findIndex(
              (question) => question.id === newRemainingQuestion.id,
            ) > -1
          ) {
            return
          }
        } else {
          newRemainingQuestion.askedQuestionList = []
        }

        if (newRemainingQuestion.remainingQuestionList) {
          if (
            newRemainingQuestion.remainingQuestionList.findIndex(
              (question) => question.id === newRemainingQuestion.id,
            ) > -1
          ) {
            return
          }
        } else {
          newRemainingQuestion.remainingQuestionList = []
        }

        // 検索機能はここに追加する。検索単語を配列にして、該当Questionになんの配列アイテムも見つからなかった場合はreturnで省く
        let wordFilterFlag = 0
        if (settingDetail.wordFilter.length === 0) {
          wordFilterFlag = 1
        }
        settingDetail.wordFilter.forEach((word) => {
          if (question.detailInfo && question.detailInfo.indexOf(word) > -1)
            wordFilterFlag = 1
          if (
            question.questionSentence &&
            question.questionSentence.indexOf(word) > -1
          )
            wordFilterFlag = 1
          if (question.answer && question.answer.indexOf(word) > -1)
            wordFilterFlag = 1
          if (question.commentary && question.commentary.indexOf(word) > -1)
            wordFilterFlag = 1
          if (
            question.choices &&
            question.choices.every((choice) => choice.indexOf(word) === -1) ===
              false
          )
            wordFilterFlag = 1
        })
        if (wordFilterFlag === 0) return
        if (newRemainingQuestion.choices) {
          // answerのない問題に自動的に解を追加
          if (newRemainingQuestion.answer === '') {
            newRemainingQuestion.answer = newRemainingQuestion.choices[0]
            console.log('解のない問題に解を自動追加')
          }
          // 選択肢をランダムに配置
          let choiceList = [...question.choices]
          newRemainingQuestion.randomizedChoices = []
          for (let i = 0; i < question.choices.length; i++) {
            newRemainingQuestion.randomizedChoices.push(
              choiceList.splice(
                Math.floor(Math.random() * choiceList.length),
                1,
              ),
            )
          }
        }
        newHistory.remainingQuestionList.push(newRemainingQuestion)
      })
    })
    setHistory([...history, newHistory])
  }
  const nextQuestion = (settingDetail) => {
    if (settingDetail.questionOrder === 'random') {
      let newHistory = history[history.length - 1]
      if (newHistory.askingQuestion) {
        newHistory.askedQuestionList = [
          ...history[history.length - 1].askedQuestionList.filter(
            (question) => question.id,
          ),
          newHistory.askingQuestion,
        ]
      }
      // 表示が多くなりすぎないように調節
      if (newHistory.askedQuestionList.length > 10) {
        newHistory.askedQuestionList.shift()
      }
      newHistory.askingQuestion = {}
      let randomNum = Math.floor(
        Math.random() *
          history[history.length - 1].remainingQuestionList.length,
      )
      newHistory.askingQuestion = newHistory.remainingQuestionList[randomNum]
      newHistory.remainingQuestionList.splice(randomNum, 1)
      newHistory.isAnswered = false
      newHistory.questionNum += 1
      setHistory([...history, newHistory])
    }
    // if (settingDetail.questionOrder === 'ascend') {
    else {
      let newHistory = history[history.length - 1]
      if (newHistory.askingQuestion) {
        newHistory.askedQuestionList = [
          ...history[history.length - 1].askedQuestionList.filter(
            (question) => question.id,
          ),
          newHistory.askingQuestion,
        ]
      }
      newHistory.askingQuestion = {}
      function compareFun(QListA, QListB) {
        if (QListA.id.indexOf('r') !== -1 && QListB.id.indexOf('r') === -1) {
          return 1
        }
        if (QListB.id.indexOf('r') !== -1 && QListA.id.indexOf('r') === -1) {
          return -1
        }
        return (
          parseInt(QListA.id.replace('r', '')) -
          parseInt(QListB.id.replace('r', ''))
        )
      }
      if (newHistory.remainingQuestionList.length > 0) {
        newHistory.remainingQuestionList.sort(compareFun)
        console.log(
          'RemainingQuestionList:' + newHistory.remainingQuestionList.length,
        )
        // newHistory.askedQuestionList = [
        //   ...history[history.length - 1].askedQuestionList,
        //   newHistory.remainingQuestionList[0],
        // ]
        newHistory.askingQuestion = newHistory.remainingQuestionList[0]
        console.log(newHistory.remainingQuestionList[0])
        newHistory.remainingQuestionList.shift()
        newHistory.isAnswered = false
        newHistory.questionNum += 1
        // 表示が多くなりすぎないように調節
        if (newHistory.askedQuestionList.length > 10) {
          newHistory.askedQuestionList.shift()
        }
        setHistory([...history, newHistory])
        console.log('nextQuestion:')
        console.log(history)
      }
    }
    // 追記：
  }
  const checkAnswer = () => {
    let newHistory = history[history.length - 1]
    newHistory.isAnswered = true
    setHistory([...history, newHistory])
    console.log('checkAnswer')
  }
  const hideAnswer = () => {
    let newHistory = history[history.length - 1]
    newHistory.isAnswered = false
    setHistory([...history, newHistory])
  }
  const reviewQuestion = (index) => {
    let newHistory = history[history.length - 1]
    if (
      newHistory.askedQuestionList[index] &&
      newHistory.askedQuestionList[index].id.indexOf('r') === -1
    ) {
      newHistory.askedQuestionList[index].id =
        'r' + newHistory.askedQuestionList[index].id
      newHistory.remainingQuestionList.push(newHistory.askedQuestionList[index])
      newHistory.askedQuestionList.splice(index, 1)

      setHistory([...history, newHistory])
    }
    // 現在作業途中
  }
  const reviewAskingQuestion = (settingDetail) => {
    let newHistory = history[history.length - 1]
    if (
      newHistory.askingQuestion &&
      newHistory.askingQuestion.id.indexOf('r') === -1
    ) {
      newHistory.askingQuestion.id = 'r' + newHistory.askingQuestion.id
      newHistory.isAnswered = false

      newHistory.remainingQuestionList.push(newHistory.askingQuestion)
      newHistory.askingQuestion = {}
      setHistory([...history, newHistory])
      nextQuestion(settingDetail)
    }
  }
  // const addQuestionNum = (num) => {
  //   if (num === '') {
  //     num = 1
  //   }
  //   let newHistory = history[history.length - 1]
  // }
  return {
    history,
    showHistory,
    selectQuestionList,
    nextQuestion,
    checkAnswer,
    hideAnswer,
    reviewQuestion,
    reviewAskingQuestion,
    loadHistory,
  }
}

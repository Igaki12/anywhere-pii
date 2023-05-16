import { useState } from 'react'
// 途中で設定を変更するときはuseEffectが必要？

export const useSetting = () => {
  const [settingDetail, setSettingDetail] = useState({
    isSet: false,
    mode: 'training',
    questionOrder: 'ascend',
    questionRange: ['2020本試'],
    wordFilter: [],
  })
  const showSettingDetail = () => {
    return settingDetail
  }
  const updateQuestionOrder = (order) => {
    let updatedSettingDetail = settingDetail
    updatedSettingDetail.questionOrder = order
    console.log('updatedQuestionOrder:' + updatedSettingDetail)
    setSettingDetail(updatedSettingDetail)
  }
  const toggleQuestionRange = (value) => {
    let toggledSettingDetail = settingDetail
    if (toggledSettingDetail.questionRange.indexOf(value) === -1) {
      toggledSettingDetail.questionRange.push(value)
    } else {
      toggledSettingDetail.questionRange = settingDetail.questionRange.filter(
        (content) => content !== value,
      )
    }
    console.log('toggledQuestionRange:' + toggledSettingDetail)
    setSettingDetail(toggledSettingDetail)
  }
  const updateQuestionMode = (value) => {
    let updatedSettingDetail = settingDetail
    updatedSettingDetail.mode = value
    console.log('updatedQuestionMode:' + value)
    setSettingDetail(updatedSettingDetail)
  }
  const makeSetting = () => {
    let updatedSettingDetail = settingDetail
    updatedSettingDetail.isSet = true
    console.log('make setting')
    setSettingDetail(updatedSettingDetail)
  }
  const addWordFilter = (word) => {
    let newSettingDetail = settingDetail
    newSettingDetail.wordFilter.push(word)
    console.log('addWOrdFilter:', word)
    setSettingDetail(newSettingDetail)
  }
  const deleteWordFilter = (index) => {
    let newSettingDetail = settingDetail
    newSettingDetail.wordFilter.splice(index, 1)
    console.log('deleteWOrdFilter:', index)
    setSettingDetail(newSettingDetail)
  }
  // const addQuestionNum = (num) => {
  //   if (num === '') {
  //     num = 1
  //   }
  //   let newSettingDetail = settingDetail
  //   newSettingDetail.questionNum += num
  //   setSettingDetail(newSettingDetail)
  //   console.log('addQuestionNum:' + num)
  // }
  const updateAllSettings = (newSettingDetail) => {
    setSettingDetail(newSettingDetail)
    console.log(newSettingDetail)
  }
  return {
    settingDetail,
    showSettingDetail,
    updateQuestionOrder,
    toggleQuestionRange,
    updateQuestionMode,
    makeSetting,
    addWordFilter,
    deleteWordFilter,
    updateAllSettings,
  }
}

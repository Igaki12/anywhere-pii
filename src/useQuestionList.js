import {
    useState
} from 'react'

// import from './img/answer/.png'

export const useQuestionList = () => {
    const appName = 'anywhere-pii'
    const jpName = '病原体・感染防御'
    const [questionList, setQuestionList] = useState([
        // ここに問題のリストを記述(選択式の場合は[0]に正解択をいれた配列をつくる)
        {
            groupTag: '授業中',
            groupContents: [{
                    detailInfo: '5/29',
                    questionImg: [],
                    questionSentence: 'ライム病について正しいのはどれか、3つ選べ',
                    answerImg: [],
                    choices: ["ダニが媒介する", "夏より冬に多く発症する", "病原体はリケッチアである", "皮膚紅斑がみられる", "テトラサイクリンが有効である"],
                    answer: 'ダニが媒介する・皮膚紅斑がみられる・テトラサイクリンが有効である。',
                    commentary: '',
                },
                // {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                //   {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                // {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                //   {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                // {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                //   {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                // {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
                //   {
                //     detailInfo: '',
                //     questionImg: [],
                //     questionSentence:
                //       '',
                //     answerImg: [],
                //     answer: '',
                //     commentary: '',
                //   },
            ],
        },
    ])
    const showQuestionList = () => {
        return questionList
    }
    return {
        showQuestionList,
        appName,
        jpName,
    }
}
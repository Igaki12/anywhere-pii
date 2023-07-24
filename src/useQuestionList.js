import {
    useState
} from 'react'
import mosquitoVectors from './img/answer/mosquitoVectors.png';
import filaria from './img/answer/filaria.png';

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
                    answerImg: [mosquitoVectors],
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
        }, {
            groupTag: "2021本試験",
            groupContents: [{
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '蚊媒介性ウイルス感染症でないものをすべて選べ。',
                    choices: ["ジカ熱", "マラリア", "チワングニア熱", "フィラリア症", "日本脳炎"],
                    answerImg: [mosquitoVectors, filaria],
                    answer: 'マラリア・フィラリア',
                    commentary: 'マラリア・フィラリアはウイルスではない。マラリアは原虫（細胞壁をもたず運動・捕食能力をもつ単細胞寄生虫）で、フィラリアは線虫（糸状の多細胞寄生虫）。選択肢の病原体はすべて蚊媒介性ではある。',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
                {
                    detailInfo: '',
                    questionImg: [],
                    questionSentence: '',
                    choices: ["", "", "", "", ""],
                    answerImg: [],
                    answer: '',
                    commentary: '',
                },
            ]
        }
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
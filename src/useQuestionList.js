import {
    useState
} from 'react'
import mosquitoVectors from './img/answer/mosquitoVectors.png';
import filaria from './img/answer/filaria.png';

// import from './img/answer/.png'

export const useQuestionList = () => {
    const appName = 'anywhere-pii'
    const jpName = '寄生虫学'
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
                {
                    detailInfo: '9/4確認テスト',
                    questionImg: [],
                    questionSentence:
                      '寄生虫感染の検査方法には大別して3つある。最も感度が高い検出方法は、以下のどれか',
                    answerImg: [],
                choices:["虫そのもの（虫卵検査などを含む）","免疫学的検査","遺伝子検査"],
                    answer: '遺伝子検査',
                    commentary: 'ようは遺伝子というのは一つの組織の一つの細胞を増幅させるので、非常に感度が高いのが特徴である。新型コロナウイルスもこれを利用して光源検査をしていた。遺伝子検査＞免疫学的検査（ちょっと限定した条件/抗体が賛成されないとダメ）＞虫卵検査（ベンから虫卵を検出できなければ、見落とせばそれまで）の順で感度が一般的に感度が高い。虫卵検査は安価（顕微鏡1つから）であることが長所',
                  },
                  {
                    detailInfo: '9/4確認テスト',
                    questionImg: [],
                    questionSentence:
                      '原虫の検査について、以下の文章で正しいものはどれか、1つ選べ',
                    answerImg: [],
                choices:["赤痢アメーバの栄養型は、室温保存でも１週間程度、運動性が認められる","クリイプトスポリ次有無は自家傾向を認めない","糞便検査ができない場合は、保存せず、検査を諦める","蟯虫卵の虫卵検査は、複合感染を検出可能である"],
                    answer: '4番目',
                    commentary: '室温ではなく37度下、１週間程度見ることは不可能。検査を諦めるのではなく、他の検査方法を検討する。便は保存する。複合感染するというのは蠕虫は虫卵の形、大きさがたくさんあるので、虫卵の形で卵を見分けられるため、複数の感染を検出できる。',
                  },
                  {
                    detailInfo: '9/4確認テスト',
                    questionImg: [],
                    questionSentence:
                      '寄生虫感染の免疫学的検査において、抗体検査が困難の疾患は以下のうちどれか。1つ選べ',
                    answerImg: [],
                choices:["トキソプラズマ症","日本海裂頭条虫","マラリア","トキソカラ症","ウェステルマン肺吸虫症"],
                    answer: '日本海裂頭条虫',
                    commentary: '腸管内に寄生する寄生虫は、炎症が少なく、抗体が形成されないことが多い。選択肢の他の寄生虫は腸管の外の寄生虫。基本的には抗原抗体反応は免疫学的検査になるが、抗体産生するような状況（体内への侵入）がないと抗体は検出されない。そこまでハードな疾患ではないため、日本海裂頭条虫は検出しにくい。',
                  },
                  {
                    detailInfo: '9/4確認テスト',
                    questionImg: [],
                    questionSentence:
                      '寄生虫感染症の遺伝子診断について、以下の文章で正しいものを1つ選べ',
                    answerImg: [],
                choices:["遺伝子診断には、ウェスタンブロッティング法を用いる","マラリア原虫の感染で、複合感染は検出できない","新種の寄生虫による罹患では、遺伝子診断が困難である","虫卵からの遺伝子診断は、DNAが少ないため検出不可能である。"],
                    answer: '3番目',
                    commentary: 'WB(ウェスタンブロット法)ではなくPCR。マラリア原虫には種類があり、その中での複合感染などが可能。元となる鋳型（既知の寄生虫）でないと遺伝子診断ができないため、該当。虫卵からの診断はできる。遺伝子は鋳型（テンプレート）がないと検出できないので、該当。遺伝子検査とWBは異なる（WBはタンパク質を検出する）。マラリア原虫の場合は複合感染を検出できる。この場合、ある遺伝子に対するプローブを用いる。虫卵からの遺伝子診断は原理的には可能である。（原理的には）１個でも虫卵があれば、その中の遺伝子を取得して遺伝子診断することができる。PCRは少ない寮からでも検出できる点でも非常に有用である。',
                  },
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
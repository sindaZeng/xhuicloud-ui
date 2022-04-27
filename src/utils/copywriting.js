/*
 * MIT License
 * Copyright <2021-2022>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @Author: Sinda
 * @Email:  xhuicloud@163.com
 */

export const period = () => {
  const val = new Date().getHours()
  const randomNum = Math.floor(Math.random() * lateNight.length + 1) - 1
  if (val >= 3 && val < 6) {
    return ['0', beforeDawn[randomNum], '凌晨啦，']
  } else if (val >= 6 && val < 8) {
    return ['1', morning[randomNum], '早晨好，']
  } else if (val >= 8 && val < 11) {
    return ['2', forenoon[randomNum], '上午了哦']
  } else if (val >= 11 && val < 13) {
    return ['3', noon[randomNum], '中午记得吃饭~']
  } else if (val >= 13 && val < 17) {
    return ['4', '下午']
  } else if (val >= 17 && val < 19) {
    return ['5', '傍晚']
  } else if (val >= 19 && val < 23) {
    return ['6', '晚上']
  } else {
    return ['7', lateNight[randomNum], '早点休息哦。']
  }
}

const morning = [
  '生活不一定很酷，但一定要有态度，',
  '新的一天，永远都要活给自己看，而且笑容要特别灿烂，',
  '心里住着小星星，生活才会亮晶晶，',
  '生活平平淡淡，不悲不喜，不惊不扰，这样就好，',
  '无论世界是否待你温柔，请保持住你的善良，因为好运会与你不期而遇，',
  '活在自己的热爱里，而不是别人的眼光里，',
  '人生苦短，怎么灿烂，怎么闪，',
  '有趣都藏在无聊日子里，所以保持热爱，',
  '任何事情，总有答案，与其烦恼，不如顺其自然，',
  '不要勉强自己活成别人期待的样子，做自己就好，该来的都在路上，',
  '不一定要很漂亮，但一定要很快乐，生活很好记得微笑。来给生活比个耶！',
  '无论你经历了什么，未来都请你善待自己好好生活，不管发生什么都要让自己快乐！',
  '什么都可以不好，心情不能不好，生活嘛笑一笑就好了，永远乐观自信，永远积极向上享受当下，才是最好的活法。',
  '努力的意义，就是让以后的日子里，全部都是自己喜欢的人和事。',
  '不负自己，不将就生活，你的存在配得上世界所有美好。',
  '知足且上进，温柔而坚定，从能力到美貌请努力让自己更出色。',
  '心里满是阳光，才是永恒的美，新的一天，愿阳光洒满你的心间，努力工作，努力生活。'
]

const forenoon = [
  '愿你不辜负时间的馈赠，努力过成自己喜欢的样子。走在路上，总有一天可以到达，',
  '世界上唯一可以不劳而获的就是贫穷，唯一可以无中生有的是梦想，没有哪件事是不动手就可以实现的。世界虽残酷，但只要你愿意走，总会有路！',
  '每天多做一点点，就是成功的开始，每天多创新一点点，就是领先的开始，每天多学一点点，就是进步的开始；每天多进步一点点，就是卓越的开始，',
  '人生没有对错，只有选择后的坚持，不后悔，走下去，就是对的。走着走着，花就开了。',
  '别着急，你看这年复一年，春光不必趁早，冬霜不会迟到，过去的都会过去，该来的都在路上，一切都是刚刚好。',
  '再小的力量，也可以创造大不同。所以，不要轻视自己的每点努力！',
  '努力的意义：不要当父母需要你时，除了泪水，一无所有。不要当孩子需要你时，除了惭愧一无所有。不要当自己回首过去时，除了蹉跎一无所有！',
  '机会是留给努力奋斗的人的，有谁的幸运，凭空而来，只有当你足够努力，你才会足够幸运。这世界不会辜负每一份努力和坚持。时光不会怠慢执着而勇敢的每一个人，',
  '永远年轻，永远向上，永远热泪盈眶。保持热爱，奔赴山海。',
  '决定我们成为什么样的人，不是我们的能力，而是我们的选择。',
  '过好每一天，就是对无奈人生最好的报复。',
  '别让今天的懒成为未来的难，美好的东西永远不会轻易获得，没有理由不前进，没有理由不打拼！',
  '人生的答卷没有橡皮擦，写了就不能再变了，过去的就让它过去，否则就是自讨苦吃；如果你想有个更好的未来，那就从现在开始，好好努力。',
  '未来始终是自己的，梦想始终是自己的，没有人会来帮你实现它。所以，为了我们的梦想，努力奔跑吧！',
  '虽然很辛苦，但我还是会选择那种滚烫的人生。',
  '满怀希望就会所向披靡。',
  '你必须暗自努力，才能在人前显得轻松如意。',
  '别忘了答应自己要做的事情，别忘了答应自己要去的地方，无论有多难，有多远。',
  '人生苦短，无谓去担心别人怎么想你，怎么说你，做你自己想做的，快乐一点，',
  '有人在奔跑，有人在睡觉，有人在感恩，有人在报怨，有目标的睡不着，没目标的人睡不醒，努力才是人生的应有态度，睁开眼就是新的开始！',
  '有人在奔跑，有人在睡觉，有人在感恩，有人在报怨，有目标的睡不着，没目标的人睡不醒，努力才是人生的应有态度，睁开眼就是新的开始！',
  '低头要有勇气，抬头要有底气；愿时光不负努力，青春不负自己。'
]

const lateNight = [
  '早点睡吧，你想要的，梦里都有，',
  '万事皆苦，别人都在对抗，你也不能认输，',
  '雨会停，心会晴，没有什么会永远的糟糕透顶，',
  '感恩身边一切美好，抱着愉快的心情进入梦乡，',
  '我的微笑可以给任何人，但我的心只能给一个人，',
  '为了未来美一点，现在必须苦一点。低头不算认输，放弃才是懦夫，',
  '生命太短，别把一个对你好的人弄丢了，用心去爱那些对你好的人，忘掉那些不知道珍惜你的人。'
]

const noon = [
  '给你一个轻轻的祝福，愿它每分每秒都带给你健康、好运和幸福。',
  '祝你工作顺利样样好。',
  '匆匆过客，茫茫红尘，时过境迁，物非人非。',
  '以平常心看世界，花开花谢都是风景。',
  '哪里有天才，我只是把别人喝咖啡的工夫都用在了工作上了。',
  '做人要抬头有勇气，面对现实。低头有底气，面对自己。做事要有骨气，据理力争。做人要有志气，铮铮铁骨。凡事要争气。',
  '永远要记住，无论我们做什么，人生从来都没有失败，唯一的失败就是自己放弃。',
  '正确的认识生活中的种种磨砺，这何尝不是命运的另一种成就。保重好自己的心态，也是对自己的一种尊敬和拯救。',
  '努力在自己的位置上做到最好，这就够了。',
  '你要记得，始终会有那么一些人一直在你的身旁支持着你。',
  '有错过，才会有新的遇见。缘分就是，不早不晚，刚刚好。',
  '今天的低头，只为明天的俯视而彩排。',
  '运气永远不可能持续一辈子，能帮助你持续一辈子的东西只有你个人的能力。',
  '我只担心一件事，我怕我配不上自己所受的苦难。',
  '没有什么不可能，不可能只存在你的心中！',
  '能坚持的时候千万别轻易放手，失去了就去让自己变的更好。',
  '不要放弃。我坚信你能行。人就是人，无论多么卑微。'
]

const beforeDawn = [
  '什么都在退步，只有熬夜在进步，',
  '与其被动失眠，不如主动熬夜，',
  '在一切破旧褪色中请你永远闪烁，',
  '慢品人间烟火色，闲观万事岁月长，',
  '日子要好好过，下次见面要跟我说快乐的事，',
  '美好的事情，记得三两件，就足以酿酒了，',
  '月亮照回湖心，野鹤奔向闲云，我步入你，',
  '生活总是来来往往，千万别等来日方长，',
  '在路上，永远年轻，永远热泪盈眶，',
  '岁月为笔，相思为墨，字里行间全是你，',
  '不负光阴就是最好的努力，而努力就是最好的自己，',
  '每个人都在艰难的生活，不要想着难过的就你一人，'
]

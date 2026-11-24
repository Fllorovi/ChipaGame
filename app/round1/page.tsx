
"use client";

import { useEffect, useState } from "react";

const zones = [
  {
    id: 1,
    name: "Водопад Забытых Снов",
    description: "Скала, поросшая мхом. Здесь обитает Водяной Страж.",
    x: 22,
    y: 57,
    dialogues: [
      { speaker: "Чипа", avatar: "🔵", text: "Первое место, которое мы посетим: это Водопад Забытых Снов. Он у скалы, поросшей мхом. Раньше там люди просили у острова дождь. Сейчас водопад почти высох, но у самого обрыва лежит руна. Её охраняет Водяной Страж — огромный механический змей из старых труб и шестерёнок. Что вам нужно сделать, он скажет сам. Я только знаю, где руна и кто её стережёт." },
      { speaker: "Артём", avatar: "🧑", text: "Змей из труб? Ну, хоть не живой. С железом проще — его можно перехитрить." },
      { speaker: "Саша", avatar: "👦", text: "Ага. Только этот «змей из труб» нас ещё не видел." },
      { speaker: "Чипа", avatar: "🔵", text: "Идёмте. Я проведу. Только держитесь рядом — тут легко провалиться в мох." },
      { speaker: "Чипа", avatar: "🔵", text: "Осторожно, здесь корни. Вот тут не наступите — тут яма." },
      { speaker: "Артём", avatar: "🧑", text: "Ты как GPS, только светящийся." },
      { speaker: "Чипа", avatar: "🔵", text: "Вот он. Я дальше не пойду — он меня не любит. Но я буду тут. Рядом." },
      { speaker: "Водяной Страж", avatar: "🐍", text: "Значит, вы за руной. Голос у него был как несмазанная дверь. Тогда слушайте." },
    ],
    reactionDialogues: [
      { speaker: "Артём", avatar: "🧑", text: "Ну, могло быть и хуже." },
      { speaker: "Саша", avatar: "👦", text: "Могло. Но всё равно как-то сыро и неуютно." },
      { speaker: "Чипа", avatar: "🔵", text: "Вы справитесь. Я верю." },
    ],
    task: {
      title: "Испытание Водяного Стража",
      question: "Страж проскрипел: «Мой механизм заклинило. Чтобы шестерёнки закрутились без трения и водопад ожил, расставьте их по размеру — от меньшей к большей».",
      options: [
        { id: "a", label: "⚙️ Огромная → Большая → Средняя → Малая" },
        { id: "b", label: "⚙️ Малая → Средняя → Большая → Огромная" },
        { id: "c", label: "⚙️ Сварить все шестерёнки в один монолит" },
        { id: "d", label: "⚙️ Выкинуть шестерёнки и толкнуть рычаг" },
      ],
    },
    successDialogues: [
      { speaker: "Водяной Страж", avatar: "🐍", text: "Страж медленно разжал кольца. Трубы его корпуса зашипели паром. — Проходите. Руна ваша. Давно я не видел таких упрямых." },
      { speaker: "Рассказчик", avatar: "👤", text: "Я коснулся руны первым — она была холодной, как речная вода. Потом вспыхнула мягким синим светом. И в тот же момент земля под ногами дрогнула. Не сильно, будто остров сделал вдох. Где-то в глубине скалы шумнула вода, и тонкая струйка водопада стала чуть шире. Мох у подножия скалы зазеленел ярче." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа подлетел к нам, и его свет стал заметно ярче: — Мне… мне уже легче. Спасибо. Правда." },
      { speaker: "Артём", avatar: "🧑", text: "Артём обернулся к нему: — Это мы ещё только начали." },
      { speaker: "Саша", avatar: "👦", text: "Саша улыбнулся: — Одной руной меньше." },
    ],
    failureDialogues: [
      { speaker: "Водяной Страж", avatar: "🐍", text: "Страж зашипел паром и сжал кольца ещё плотнее. Его глаз мигнул красным. — Нет. Вы не прошли. Руна останется здесь." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он не сдвинулся. Кольца не разжались. Земля под ногами дрогнула — остров просел. Вода у подножия скалы поднялась выше, мох стал скользким." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа тихо охнул. Его свет резко потускнел. — Одна руна… потеряна. Барьер не завершён. Остров… он не выдержит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он посмотрел на нас своими большими добрыми глазами, и в них была вина. А потом его свет погас. Где-то вдалеке шумнула вода. Она подступала." },
    ],
  },
  {
    id: 2,
    name: "Пещера Эха",
    description: "Глубоко в лесу. Стены повторяют мысли. Охраняется Каменным Големом.",
    x: 38,
    y: 30,
    dialogues: [
      { speaker: "Чипа", avatar: "🔵", text: "Второе место — Пещера Эха. Она глубоко в лесу. Там всегда темно, а стены будто повторяют твои мысли. Руна внутри. Её охраняет Каменный Голем. Он старый, неповоротливый, но очень сильный. Испытание объявит он." },
      { speaker: "Саша", avatar: "👦", text: "Шепчущие стены и каменный страж. Звучит как место, где я точно не хочу оставаться один." },
      { speaker: "Рассказчик", avatar: "👤", text: "— Ты и не будешь, — сказал я." },
      { speaker: "Артём", avatar: "🧑", text: "Главное, чтобы этот Голем не оказался болтливым. А то стены повторяют, он повторяет…" },
      { speaker: "Чипа", avatar: "🔵", text: "Я пойду с вами, но не близко. Голем не любит, когда рядом много света. Буду ждать у стены." },
      { speaker: "Каменный Голем", avatar: "🗿", text: "Пришли. Голос был низкий, как камнепад, но с металлическим скрежетом. Тогда слушайте." },
    ],
    reactionDialogues: [
      { speaker: "Артём", avatar: "🧑", text: "Ну, хоть не бегать." },
      { speaker: "Саша", avatar: "👦", text: "Зато думать придётся." },
      { speaker: "Чипа", avatar: "🔵", text: "Я рядом. Не торопитесь." },
    ],
    task: {
      title: "Испытание Каменного Голема",
      question: "Голем загудел: «Стены пещеры повторяют мысли. Скажи слово, которое никогда не меняется и не боится темноты — и я отступлю от руны».",
      options: [
        { id: "a", label: "🏠 Домой" },
        { id: "b", label: "💧 Вода" },
        { id: "c", label: "🪨 Камень" },
        { id: "d", label: "🌑 Тьма" },
      ],
    },
    successDialogues: [
      { speaker: "Каменный Голем", avatar: "🗿", text: "Голем медленно отступил в сторону. Его шарниры скрипнули, жёлтые линзы мигнули и погасли. — Проходите. Камень вас запомнит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Я коснулся руны — она была тёплой, как нагретый солнцем камень. Пещера на миг стала светлее. Шёпот стих. Земля под ногами дрогнула — уже знакомо, будто остров сделал ещё один вдох." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа подлетел к нам. Его свет стал чуть ярче, но сам он выглядел уставшим. — Ещё одна. Остров держится. Идём дальше." },
      { speaker: "Артём", avatar: "🧑", text: "Артём хлопнул его по плечу: — Держись, Чипа. Ещё три." },
      { speaker: "Саша", avatar: "👦", text: "Саша улыбнулся: — И всё-таки мы справились." },
    ],
    failureDialogues: [
      { speaker: "Каменный Голем", avatar: "🗿", text: "Голем сдвинулся обратно и перекрыл руну. Линзы вспыхнули красным. — Нет. Вы не прошли. Камень вас не запомнит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он застыл. Мы не смогли его сдвинуть. Земля дрогнула, с потолка посыпалась каменная крошка. Шёпот стен стал громче, будто они смеялись." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа тихо охнул и опустился ещё ниже. Его свет потускнел. — Ещё одна потеряна. Барьер не завершён. Остров… он не выдержит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он посмотрел на нас, и в его больших добрых глазах была вина. А потом его свет погас. Где-то в глубине пещеры шумнула вода. Она подступала." },
    ],
  },
  {
    id: 3,
    name: "Мангровый Лабиринт",
    description: "Заросли у самого берега. Корни деревьев сплетаются в узкие проходы.",
    x: 54,
    y: 57,
    dialogues: [
      { speaker: "Чипа", avatar: "🔵", text: "Третье место — Мангровый Лабиринт. Заросли у самого берега. Корни деревьев сплетаются в узкие проходы. В центре лежит руна. Её охраняет Трясинный Дух — болотный огонёк. Он любит водить путников кругами. Задание скажет сам." },
      { speaker: "Артём", avatar: "🧑", text: "Болотный огонёк с чувством юмора. Отлично." },
      { speaker: "Саша", avatar: "👦", text: "Главное, чтобы он не решил, что мы тут надолго." },
      { speaker: "Чипа", avatar: "🔵", text: "Здесь легко заблудиться. Я проведу вас до руны, но дальше — сами. Дух меня не любит, он считает, что я слишком яркий." },
      { speaker: "Саша", avatar: "👦", text: "Мы это дерево уже третий раз проходим." },
      { speaker: "Артём", avatar: "🧑", text: "Может, оно за нами ходит?" },
      { speaker: "Трясинный Дух", avatar: "🟢", text: "Кто тут у нас? Путники. Свеженькие. Тогда слушайте." },
    ],
    reactionDialogues: [
      { speaker: "Артём", avatar: "🧑", text: "Ну, это мы ещё посмотрим, кто кого запутает." },
      { speaker: "Саша", avatar: "👦", text: "Я уже запутался." },
      { speaker: "Чипа", avatar: "🔵", text: "Я рядом. Только не оглядывайтесь, когда пойдёте за ним." },
    ],
    task: {
      title: "Испытание Трясинного Духа",
      question: "Дух пропел, и его фонарики мигнули: «Я покажу верную дорогу к руне. Но у меня одно правило. Что нельзя делать, пока идёшь за моим огоньком?»",
      options: [
        { id: "a", label: "👀 Оглядываться" },
        { id: "b", label: "🗣️ Разговаривать" },
        { id: "c", label: "💡 Светить фонарём" },
        { id: "d", label: "🏃 Бежать" },
      ],
    },
    successDialogues: [
      { speaker: "Трясинный Дух", avatar: "🟢", text: "Дух захихикал, его шестерёнки завертелись быстрее. — Идите за мной. Только не отставайте. И не оглядывайтесь." },
      { speaker: "Рассказчик", avatar: "👤", text: "Дорога оказалась короткой — через минуту мы вышли к центру лабиринта. Там, на кочке мха, лежала руна. Я коснулся её, и она вспыхнула зелёным. Земля под ногами дрогнула — уже знакомо, будто остров сделал ещё один вдох." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа подлетел к нам. Его свет стал чуть ярче. — Ещё одна. Остров держится. Идём дальше." },
      { speaker: "Артём", avatar: "🧑", text: "Артём вытер лоб: — Ну, этот хоть не кусался." },
      { speaker: "Саша", avatar: "👦", text: "Саша улыбнулся: — Зато чуть не завёл." },
      { speaker: "Трясинный Дух", avatar: "🟢", text: "Трясинный Дух хихикнул у нас за спиной: — Приходите ещё. Я люблю гостей." },
    ],
    failureDialogues: [
      { speaker: "Трясинный Дух", avatar: "🟢", text: "Дух погас и пропел из темноты: — Не-е-ет. Вы не прошли. Кружитесь дальше. Мне-то что." },
      { speaker: "Рассказчик", avatar: "👤", text: "Его шестерёнки заскрипели, фонарики мигнули красным и погасли. Мы остались в лабиринте, и сколько ни шли — выходили к тому же дереву с кривой веткой. Руна осталась недоступной. Земля дрогнула — остров просел. Вода в манграх поднялась выше, корни стали скользкими." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа тихо охнул и опустился ниже. Его свет потускнел почти до синего уголька. — Потеряли ещё одну. Барьер не завершён. Остров… он не выдержит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он посмотрел на нас, и в его глазах была вина. А потом его свет погас. Вода в манграх поднялась ещё выше. Она подступала." },
    ],
  },
  {
    id: 4,
    name: "Стеклянный Пляж",
    description: "Осколки стекла блестят на солнце. Охраняется Песчаным Скорпионом.",
    x: 69,
    y: 25,
    dialogues: [
      { speaker: "Чипа", avatar: "🔵", text: "Четвёртое место — Стеклянный Пляж. Когда-то там был песок, но после штормов он превратился в осколки, которые блестят на солнце. Руна лежит в центре пляжа. Её охраняет Песчаный Скорпион — механический, с хвостом-цепью. Что нужно сделать, он объяснит сам." },
      { speaker: "Артём", avatar: "🧑", text: "Стекло под ногами и скорпион с цепью. Просто мечта." },
      { speaker: "Саша", avatar: "👦", text: "А он точно нас не зацепит?" },
      { speaker: "Рассказчик", avatar: "👤", text: "— Надеюсь, — сказал я." },
      { speaker: "Чипа", avatar: "🔵", text: "Я дальше не пойду. Скорпион не любит, когда что-то светится у него над головой. Буду ждать здесь." },
      { speaker: "Песчаный Скорпион", avatar: "🦂", text: "Стоять. Голос был как металл по стеклу. Вы за руной? Тогда слушайте." },
    ],
    reactionDialogues: [
      { speaker: "Артём", avatar: "🧑", text: "Ну, хоть не кусается." },
      { speaker: "Саша", avatar: "👦", text: "Зато цепью может." },
      { speaker: "Чипа", avatar: "🔵", text: "Я рядом. Только под ноги смотрите." },
    ],
    task: {
      title: "Испытание Песчаного Скорпиона",
      question: "Скорпион проскрежетал хвостом-цепью: «Стекло под ногами острых и звонких. Скажи, как правильно идти по моему пляжу, чтобы я пропустил тебя к руне».",
      options: [
        { id: "a", label: "🏃 Бежать как можно быстрее" },
        { id: "b", label: "👣 Не спешить и смотреть под ноги" },
        { id: "c", label: "🌪️ Идти против ветра" },
        { id: "d", label: "🪨 Бросать камни вперёд" },
      ],
    },
    successDialogues: [
      { speaker: "Песчаный Скорпион", avatar: "🦂", text: "Скорпион опустил хвост-цепь. Его красные огоньки мигнули и погасли. — Проходите. Руна ваша. Только под ноги смотрите." },
      { speaker: "Рассказчик", avatar: "👤", text: "Я коснулся руны — она была тёплой, как стекло, нагретое солнцем. Осколки под ногами на миг засветились изнутри. Земля дрогнула — уже знакомо, будто остров сделал ещё один вдох. Кромка берега будто отступила на палец назад." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа подлетел к нам. Его свет стал чуть ярче. — Ещё одна. Остров держится. Осталась последняя." },
      { speaker: "Артём", avatar: "🧑", text: "Артём вытер лоб: — Ну, этот хоть не хихикал." },
      { speaker: "Саша", avatar: "👦", text: "Саша улыбнулся: — Зато цепью махал." },
    ],
    failureDialogues: [
      { speaker: "Песчаный Скорпион", avatar: "🦂", text: "Скорпион поднял хвост-цепь. Его красные огоньки вспыхнули ярче. — Нет. Вы не прошли. Стекло не любит спешки. Уходите." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он не сдвинулся. Руна осталась за цепью. Земля дрогнула — остров просел. Вода у кромки пляжа поднялась выше, осколки под ногами стали скользкими." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа тихо охнул и опустился ниже. Его свет потускнел, задрожал. — Ещё одна потеряна. Барьер не завершён. Остров… он не выдержит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он посмотрел на нас, и в его глазах была вина. А потом его свет погас. Вода у кромки пляжа поднялась ещё выше. Она подступала." },
    ],
  },
  {
    id: 5,
    name: "Древний Храм",
    description: "Развалины у подножия горы. Охраняется Хранителем Времени.",
    x: 81,
    y: 55,
    dialogues: [
      { speaker: "Чипа", avatar: "🔵", text: "Последнее, пятое место — Древний Храм у подножия горы. Руна в храме. Её охраняет Хранитель Времени — старый механизм. Он проверяет путников. Испытание объявит сам." },
      { speaker: "Артём", avatar: "🧑", text: "Ну, наконец-то. Храм. Хранитель. Ничего необычного." },
      { speaker: "Саша", avatar: "👦", text: "Ты правда думаешь, что это будет просто?" },
      { speaker: "Артём", avatar: "🧑", text: "Нет. Но звучит красиво." },
      { speaker: "Чипа", avatar: "🔵", text: "Это последняя руна. Если мы её активируем — остров перестанет тонуть. Если нет…" },
      { speaker: "Чипа", avatar: "🔵", text: "Я дальше не пойду. Хранитель не любит, когда рядом кто-то живой. Буду ждать здесь." },
      { speaker: "Саша", avatar: "👦", text: "Ты же дух." },
      { speaker: "Чипа", avatar: "🔵", text: "Вот именно. Он не любит ни живых, ни духов. Только время." },
      { speaker: "Хранитель Времени", avatar: "⏳", text: "Вы дошли. Голос у него был ровный, как ход часов, но с металлическим эхом. Стрелки остановились. Тогда слушайте." },
    ],
    reactionDialogues: [
      { speaker: "Артём", avatar: "🧑", text: "Ну, теперь я вообще ничего не понимаю." },
      { speaker: "Саша", avatar: "👦", text: "Зато он объяснил понятно." },
      { speaker: "Чипа", avatar: "🔵", text: "Я рядом. Не торопитесь. У вас есть время." },
    ],
    task: {
      title: "Испытание Хранителя Времени",
      question: "Хранитель загудел остановленными стрелками: «Я остановил время. Отгадай загадку, и я открою последнюю руну: Я всегда иду, но никогда не двигаюсь с места. У меня есть лицо, но нет глаз. Что я?»",
      options: [
        { id: "a", label: "⏳ Время (Часы)" },
        { id: "b", label: "⚡ Молния" },
        { id: "c", label: "📡 Эхо" },
        { id: "d", label: "🔧 Механизм" },
      ],
    },
    successDialogues: [
      { speaker: "Хранитель Времени", avatar: "⏳", text: "Хранитель замер. Его стрелки провернулись вперёд, шестерёнки тихо щёлкнули. — Время на вашей стороне. Проходите. Руна ваша." },
      { speaker: "Рассказчик", avatar: "👤", text: "Земля дрогнула. Но не так, как раньше. Сильнее. Будто остров сделал глубокий вдох и расправил плечи. Где-то внизу зашумела вода, отступая от берега. Камни под ногами стали крепче, мох зазеленел ярче, и даже ветер стих." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа сорвался с места так быстро, что чуть не врезался в колонну. Его свет стал ярче, чем за весь путь. — Вы смогли. Все пять рун. Остров больше не тонет. Он… он держится." },
      { speaker: "Артём", avatar: "🧑", text: "Артём вытер лоб и посмотрел наверх, на гору: — Ну что, теперь наверх? К установке?" },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа кивнул: — Да. Теперь можно и наверх." },
    ],
    failureDialogues: [
      { speaker: "Хранитель Времени", avatar: "⏳", text: "Хранитель тикнул. Его стрелки дёрнулись назад, бронзовые пластины скрипнули. — Время не на вашей стороне. Вы не прошли. Руна останется здесь." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он застыл. Руна не вспыхнула. С потолка храма посыпалась каменная крошка, ветер ворвался внутрь, холодный и солёный. Внизу шумнула вода — она подступала." },
      { speaker: "Чипа", avatar: "🔵", text: "Чипа ждал у входа. Увидев наши лица, он всё понял. Его свет потускнел почти до синего уголька. — Последняя руна… потеряна. Барьер не завершён. Остров… он не выдержит." },
      { speaker: "Рассказчик", avatar: "👤", text: "Он посмотрел на нас, и в его глазах была вина. А потом его свет погас. Внизу шумнула вода. Она подступала." },
    ],
  },
];

type SavedAnswer = {
  zone_id: number;
  selected_option: string;
  is_correct: boolean;
};

export default function RoundOnePage() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [unlockedZones, setUnlockedZones] = useState<number[]>([0]);
  const [completedZones, setCompletedZones] = useState<number[]>([]);
  const [failedZones, setFailedZones] = useState<number[]>([]);

  const [modalState, setModalState] = useState<"none" | "dialogue" | "task" | "result">("none");
  const [dialoguePhase, setDialoguePhase] = useState<"intro" | "reactions" | "post">("intro");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<"idle" | "wrong" | "correct">("idle");

  const [waterLevel, setWaterLevel] = useState(50);

  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const activeZone = selectedZone !== null ? zones[selectedZone] : null;

  // Загружаем сохранённый прогресс команды
  useEffect(() => {
    async function loadProgress() {
      try {
        const response = await fetch("/api/round1/progress");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Не удалось загрузить прогресс");
        }

        const answers: SavedAnswer[] = data.answers ?? [];

        const completed = answers
          .filter((answer) => answer.is_correct)
          .map((answer) => answer.zone_id - 1);

        const failed = answers
          .filter((answer) => !answer.is_correct)
          .map((answer) => answer.zone_id - 1);

        const unlocked = Array.from(
          new Set([
            0,
            ...answers
              .map((answer) => answer.zone_id)
              .filter((zoneId) => zoneId < zones.length),
          ])
        );

        setCompletedZones(completed);
        setFailedZones(failed);
        setUnlockedZones(unlocked);

        setWaterLevel(
          Math.max(
            0,
            Math.min(100, 50 - completed.length * 10 + failed.length * 7)
          )
        );

        if (answers.length === zones.length) {
          setModalState("result");
        }
      } catch (error) {
        setApiError(
          error instanceof Error
            ? error.message
            : "Ошибка загрузки прогресса"
        );
      } finally {
        setIsLoadingProgress(false);
      }
    }

    loadProgress();
  }, []);

  const handleZoneClick = (index: number) => {
    if (
      isLoadingProgress ||
      apiError ||
      !unlockedZones.includes(index) ||
      completedZones.includes(index) ||
      failedZones.includes(index)
    ) {
      return;
    }

    setSelectedZone(index);
    setDialoguePhase("intro");
    setModalState("dialogue");
    setDialogueIndex(0);
    setSelectedAnswer(null);
    setAnswerStatus("idle");
    setApiError(null);
  };

  const getDialoguesForPhase = () => {
    if (!activeZone) return [];

    if (dialoguePhase === "intro") {
      return activeZone.dialogues;
    }

    if (dialoguePhase === "reactions") {
      return activeZone.reactionDialogues;
    }

    return answerStatus === "correct"
      ? activeZone.successDialogues
      : activeZone.failureDialogues;
  };

  const handleNextDialogue = () => {
    if (!activeZone) return;

    const currentDialogues = getDialoguesForPhase();

    if (dialogueIndex < currentDialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
      return;
    }

    if (dialoguePhase === "intro") {
      setModalState("task");
      setSelectedAnswer(null);
      setAnswerStatus("idle");
    } else if (dialoguePhase === "reactions") {
      setDialoguePhase("post");
      setDialogueIndex(0);
    } else {
      setModalState("none");
      setSelectedZone(null);
      setSelectedAnswer(null);
      setAnswerStatus("idle");

      if (completedZones.length + failedZones.length === zones.length) {
        setModalState("result");
      }
    }
  };

  const handleSelectAnswer = (optionId: string) => {
    if (answerStatus !== "idle" || isSubmittingAnswer) return;

    setSelectedAnswer(optionId);
    setApiError(null);
  };

  // Отправляем ответ на сервер.
  // Правильность ответа определяется только функцией Supabase.
  const handleCheckAnswer = async () => {
    if (
      !selectedAnswer ||
      !activeZone ||
      selectedZone === null ||
      isSubmittingAnswer
    ) {
      return;
    }

    setIsSubmittingAnswer(true);
    setApiError(null);

    try {
      const response = await fetch("/api/round1/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          zoneId: activeZone.id,
          optionId: selectedAnswer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Не удалось сохранить ответ");
      }

      const isCorrect = data.is_correct;

      setAnswerStatus(isCorrect ? "correct" : "wrong");

      const nextCompleted = isCorrect
        ? Array.from(new Set([...completedZones, selectedZone]))
        : completedZones;

      const nextFailed = !isCorrect
        ? Array.from(new Set([...failedZones, selectedZone]))
        : failedZones;

      setCompletedZones(nextCompleted);
      setFailedZones(nextFailed);

      setWaterLevel(
        Math.max(
          0,
          Math.min(100, 50 - nextCompleted.length * 10 + nextFailed.length * 7)
        )
      );

      // Открываем следующую зону после сохранения ответа на сервере
      const nextIndex = selectedZone + 1;

      if (nextIndex < zones.length) {
        setUnlockedZones((prev) =>
          prev.includes(nextIndex) ? prev : [...prev, nextIndex]
        );
      }
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Не удалось отправить ответ"
      );
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const handleProceedAfterAnswer = () => {
    setDialoguePhase("reactions");
    setModalState("dialogue");
    setDialogueIndex(0);
  };

  const progressPercent = Math.round(
    (completedZones.length / zones.length) * 100
  );

  const currentDialogues = getDialoguesForPhase();

  return (
    <main className="island-map">
      {/* Загрузка прогресса */}
      {isLoadingProgress && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03172c]">
          <div className="text-center">
            <div className="mb-4 text-lg font-bold text-[#69caff]">
              Загрузка игрового прогресса...
            </div>
            <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-[#55A4FE]" />
            </div>
          </div>
        </div>
      )}

      {/* Ошибка загрузки или сохранения */}
      {apiError && (
        <div className="fixed left-1/2 top-5 z-[90] w-[calc(100%-32px)] max-w-xl -translate-x-1/2 rounded-xl border border-red-500/40 bg-red-950/95 px-5 py-3 text-center text-sm text-red-200 shadow-xl">
          {apiError}
        </div>
      )}

      {/* ================= ПРОГРЕСС-БАР ================= */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <div className="relative h-8 w-[400px] overflow-hidden rounded-full border-2 border-white/20 bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#55A4FE] to-[#39E875] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-black tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              ПРОГРЕСС: {completedZones.length} / {zones.length}
            </span>
          </div>
        </div>
      </div>

      {/* ================= ВИДЖЕТ ОСТРОВА ================= */}
      <div className="island-widget absolute bottom-8 right-8 z-40 flex flex-col items-center gap-2">
        <div className="relative h-56 w-80 overflow-hidden rounded-2xl border-2 border-[#55A4FE]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] bg-[#0a192f]">
          <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f2027" />
                <stop offset="50%" stopColor="#203a43" />
                <stop offset="100%" stopColor="#2c5364" />
              </linearGradient>
              <linearGradient id="mountGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a5568" />
                <stop offset="100%" stopColor="#2d3748" />
              </linearGradient>
              <linearGradient id="jungleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2f855a" />
                <stop offset="100%" stopColor="#22543d" />
              </linearGradient>
              <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6e05e" />
                <stop offset="100%" stopColor="#d69e2e" />
              </linearGradient>
            </defs>

            <rect width="400" height="250" fill="url(#skyGrad)" />
            <circle cx="320" cy="60" r="20" fill="#f6e05e" opacity="0.9" />
            <circle cx="320" cy="60" r="28" fill="#f6e05e" opacity="0.2" />

            <path d="M 0 250 L 80 120 L 160 180 L 240 80 L 320 150 L 400 100 L 400 250 Z" fill="#1a202c" />
            <path d="M 100 250 L 180 90 L 260 130 L 340 60 L 380 250 Z" fill="url(#mountGrad)" />

            <path d="M 60 250 L 120 140 L 200 170 L 280 120 L 350 180 L 380 250 Z" fill="url(#jungleGrad)" />
            <g fill="#276749">
              <polygon points="130,160 145,120 160,160" />
              <rect x="142" y="160" width="6" height="15" fill="#4a3520" />
              <polygon points="200,180 220,130 240,180" />
              <rect x="217" y="180" width="6" height="20" fill="#4a3520" />
              <polygon points="290,140 310,90 330,140" />
              <rect x="307" y="140" width="6" height="25" fill="#4a3520" />
            </g>

            <path d="M 20 250 L 80 200 L 150 210 L 250 190 L 350 220 L 400 250 Z" fill="url(#sandGrad)" />
            <path d="M 90 220 L 110 210 L 120 225 Z" fill="#718096" />
            <path d="M 280 210 L 300 200 L 310 215 Z" fill="#718096" />
          </svg>

          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#001e3c] via-[#034078]/90 to-[#0077b6]/80 transition-all duration-1000 ease-in-out z-20"
            style={{ height: `${waterLevel}%` }}
          >
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[200%] h-8 animate-[wave-move_8s_linear_infinite]">
                <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="#ffffff" opacity="0.2" />
              </svg>
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[200%] h-8 absolute top-2 animate-[wave-move_12s_linear_infinite_reverse]">
                <path d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" fill="#55A4FE" opacity="0.3" />
              </svg>
            </div>
          </div>

          <div className="absolute top-3 left-3 bg-black/80 px-3 py-1.5 rounded-lg backdrop-blur-md z-30 border border-white/10 shadow-lg">
            <span className={`text-[11px] font-bold tracking-wider ${waterLevel > 60 ? "text-red-400" : "text-cyan-300"}`}>
              УРОВЕНЬ ВОДЫ: {waterLevel}%
            </span>
          </div>
        </div>
      </div>

      {/* Океан (фон карты) */}
      <div className="ocean">
        <div className="ocean-light" />
        <div className="ocean-waves ocean-waves-one" />
        <div className="ocean-waves ocean-waves-two" />
        <div className="ocean-shimmer" />
      </div>

      <div className="reef reef-one" />
      <div className="reef reef-two" />
      <div className="reef reef-three" />

      {/* Карта острова */}
      <div className="island-stage">
        <svg className="island-art" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#527c43" />
              <stop offset="48%" stopColor="#315b38" />
              <stop offset="100%" stopColor="#173b32" />
            </linearGradient>
            <linearGradient id="sand" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#e8d3a0" />
              <stop offset="100%" stopColor="#b89a69" />
            </linearGradient>
            <linearGradient id="cliff" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#596b61" />
              <stop offset="100%" stopColor="#263c39" />
            </linearGradient>
            <radialGradient id="jungle">
              <stop offset="0%" stopColor="#6c914b" />
              <stop offset="100%" stopColor="#244a32" />
            </radialGradient>
            <filter id="islandShadow">
              <feDropShadow dx="0" dy="15" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          <path d="M160 220 L260 115 L470 90 L610 120 L780 80 L1010 180 L1100 360 L1050 560 L900 680 L660 710 L430 670 L220 620 L100 440 Z" fill="#001629" opacity=".65" filter="url(#islandShadow)" transform="translate(0 22)" />
          <path d="M165 235 L230 150 L350 115 L455 135 L530 90 L665 105 L745 75 L865 125 L1000 145 L1080 245 L1060 340 L1110 420 L1050 535 L980 600 L875 625 L790 690 L660 670 L565 705 L435 650 L320 665 L220 600 L125 515 L95 405 L135 315 Z" fill="url(#land)" stroke="#b4a77d" strokeWidth="8" strokeLinejoin="round" />
          <path d="M165 235 L230 150 L350 115 L455 135 L530 90 L665 105 L745 75 L865 125 L1000 145 L1080 245 L1060 340 L1020 325 L1010 245 L930 190 L810 165 L700 145 L570 155 L455 190 L340 165 L240 215 Z" fill="url(#sand)" opacity=".95" />
          <path d="M125 515 L220 600 L320 665 L435 650 L565 705 L660 670 L790 690 L875 625 L980 600 L1050 535 L1020 480 L950 550 L840 585 L700 625 L565 650 L440 605 L320 615 L220 550 Z" fill="url(#sand)" opacity=".9" />
          <path d="M200 270 L320 205 L430 215 L480 275 L405 315 L280 330 Z" fill="url(#cliff)" opacity=".8" />
          <path d="M750 185 L870 165 L980 230 L1020 330 L930 370 L820 325 Z" fill="url(#cliff)" opacity=".8" />
          <path d="M270 270 Q370 175 480 250 Q570 190 650 250 Q760 160 850 250 Q960 260 970 370 Q900 465 790 440 Q700 510 600 450 Q500 510 400 440 Q290 470 230 370 Z" fill="url(#jungle)" />

          <path d="M570 280 Q640 235 710 275 Q770 320 725 375 Q670 415 600 375 Q540 335 570 280 Z" fill="#087b83" stroke="#6bc5b6" strokeWidth="6" />
          <path d="M250 430 Q350 350 420 390 Q490 430 550 390 Q640 350 680 400 Q760 470 840 405 Q900 365 950 430" fill="none" stroke="#c9b487" strokeWidth="14" strokeLinecap="round" />
          <path d="M250 430 Q350 350 420 390 Q490 430 550 390 Q640 350 680 400 Q760 470 840 405 Q900 365 950 430" fill="none" stroke="#e4d0a5" strokeWidth="6" strokeLinecap="round" />

          <g fill="#243c45" stroke="#8ba5a0" strokeWidth="4">
            <circle cx="455" cy="250" r="40" />
            <circle cx="610" cy="440" r="45" />
            <circle cx="830" cy="245" r="38" />
            <circle cx="950" cy="450" r="42" />
            <circle cx="265" cy="450" r="35" />
          </g>
          <g fill="#168fff" opacity=".9">
            <circle cx="455" cy="250" r="10" />
            <circle cx="610" cy="440" r="12" />
            <circle cx="830" cy="245" r="9" />
            <circle cx="950" cy="450" r="11" />
            <circle cx="265" cy="450" r="8" />
          </g>

          {[
            [300, 260], [350, 310], [390, 230], [510, 300], [750, 220],
            [900, 290], [960, 350], [390, 510], [720, 530], [850, 540],
            [540, 570], [180, 390], [1030, 390], [650, 190], [320, 550],
          ].map(([x, y], index) => (
            <g key={index} transform={`translate(${x} ${y})`}>
              <polygon points="0,-25 20,10 -20,10" fill="#173d2d" />
              <polygon points="0,-15 22,15 -22,15" fill="#234f25" />
              <rect x="-4" y="10" width="8" height="12" fill="#4a3520" />
            </g>
          ))}
        </svg>

        <svg className="island-route" viewBox="0 0 1000 620" preserveAspectRatio="none">
          <path d="M220 350 Q300 180 380 185 Q465 250 540 350 Q620 470 690 155 Q760 200 810 340" fill="none" stroke="#66caff" strokeWidth="3" strokeDasharray="8 12" strokeLinecap="round" opacity=".8" />
        </svg>

        {zones.map((zone, index) => {
          const isLocked = !unlockedZones.includes(index);
          const isCompleted = completedZones.includes(index);
          const isFailed = failedZones.includes(index);

          return (
            <button
              key={zone.id}
              type="button"
              title={isLocked ? "Зона заблокирована" : isCompleted ? "Зона пройдена" : isFailed ? "Зона провалена" : zone.name}
              onClick={() => handleZoneClick(index)}
              disabled={isLoadingProgress || !!apiError || isLocked || isCompleted || isFailed}
              className={`zone-marker ${isLocked ? "zone-marker-locked" : ""} ${isCompleted ? "zone-marker-completed" : ""} ${isFailed ? "zone-marker-failed" : ""}`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              {isLocked ? (
                <span className="zone-marker-lock">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
              ) : isCompleted ? (
                <span className="zone-marker-completed-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
              ) : isFailed ? (
                <span className="zone-marker-failed-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </span>
              ) : (
                <span className="zone-marker-ring">
                  <span className="zone-marker-core" />
                </span>
              )}
              <span className="zone-marker-label">{zone.name}</span>
            </button>
          );
        })}
      </div>

      <div className="map-footer">
        <span>ОСТРОВНОЙ КОМПЛЕКС</span>
        <span>СИСТЕМА НАВИГАЦИИ / ONLINE</span>
      </div>

      {/* ================= ДИАЛОГИ ================= */}
      {modalState === "dialogue" && activeZone && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-4xl rounded-2xl border-2 border-[#55A4FE]/40 bg-[#03172c]/95 p-8 shadow-2xl shadow-[#55A4FE]/20 relative">
            <div className="absolute -top-16 left-8 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a2342] to-[#10295A] text-6xl shadow-xl border-4 border-[#03172c]">
              {currentDialogues[dialogueIndex]?.avatar || "👤"}
            </div>

            <div className="mt-6">
              <div className="mb-2 inline-block rounded-md bg-[#55A4FE]/20 px-3 py-1">
                <p className="text-sm font-black uppercase tracking-widest text-[#69caff]">
                  {currentDialogues[dialogueIndex]?.speaker || "Неизвестно"}
                </p>
              </div>
              <p className="text-xl leading-relaxed text-white/90 min-h-[100px]">
                {currentDialogues[dialogueIndex]?.text || "..."}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
              <span className="text-xs text-white/30">
                {dialoguePhase === "intro"
                  ? "Вводная часть"
                  : dialoguePhase === "reactions"
                    ? "Реакция команды"
                    : answerStatus === "correct"
                      ? "Успешное прохождение"
                      : "Провал испытания"}
              </span>
              <button
                onClick={handleNextDialogue}
                className="rounded-xl bg-[#55A4FE] px-8 py-3 text-sm font-bold text-[#03172c] transition-colors hover:bg-white"
              >
                {dialogueIndex === currentDialogues.length - 1
                  ? dialoguePhase === "intro"
                    ? "Слушать испытание →"
                    : dialoguePhase === "reactions"
                      ? "К результату →"
                      : "Завершить"
                  : "Далее →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ЗАДАНИЕ ================= */}
      {modalState === "task" && activeZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#55A4FE]/30 bg-[#03172c] p-6 text-white shadow-2xl shadow-[#55A4FE]/10">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#69caff]">
                  Испытание стража
                </p>
                <h3 className="mt-1 text-xl font-black">{activeZone.task.title}</h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/70">
              <div className="rounded-xl border border-[#55A4FE]/30 bg-[#55A4FE]/10 p-4">
                <p className="text-base leading-relaxed text-white/90">{activeZone.task.question}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeZone.task.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrect = answerStatus === "correct" && isSelected;
                  const isWrong = answerStatus === "wrong" && isSelected;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswer(option.id)}
                      disabled={answerStatus !== "idle" || isSubmittingAnswer}
                      className={`relative flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition-all ${
                        isCorrect
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : isWrong
                            ? "border-red-500 bg-red-500/20 text-red-300"
                            : isSelected
                              ? "border-[#55A4FE] bg-[#55A4FE]/20 text-white scale-[1.02]"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 disabled:opacity-50"
                      }`}
                    >
                      {option.label}
                      {isSelected && answerStatus === "idle" && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#55A4FE]">●</span>
                      )}
                      {isCorrect && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">✔</span>}
                      {isWrong && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">✖</span>}
                    </button>
                  );
                })}
              </div>

              {apiError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center">
                  <p className="text-sm text-red-300">{apiError}</p>
                </div>
              )}

              {answerStatus === "wrong" && (
                <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-sm font-bold text-red-400">Неверно! Остров уходит под воду (+7%).</p>
                </div>
              )}

              {answerStatus === "correct" && (
                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm font-bold text-green-400">Верно! Руна ваша. Уровень воды понижается (-10%).</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {answerStatus === "correct" || answerStatus === "wrong" ? (
                  <button
                    onClick={handleProceedAfterAnswer}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 ${
                      answerStatus === "correct"
                        ? "bg-gradient-to-r from-green-600 to-green-700 shadow-green-500/20"
                        : "bg-gradient-to-r from-red-600 to-red-700 shadow-red-500/20"
                    }`}
                  >
                    Продолжить →
                  </button>
                ) : (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer || isSubmittingAnswer}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#0876c7] to-[#07549a] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingAnswer ? "Сохранение..." : "Ответить"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= РЕЗУЛЬТАТ ================= */}
      {modalState === "result" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-[#55A4FE]/40 bg-[#03172c] p-8 text-center text-white shadow-2xl shadow-[#55A4FE]/20">
            <h2 className="text-3xl font-black text-[#55A4FE] mb-2">Раунд 1 Завершен</h2>
            <p className="text-white/60 mb-8">Испытания окончены.</p>

            <div className="space-y-4 mb-8 text-left">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/60">Собрано рун:</span>
                <span className="font-bold text-green-400">{completedZones.length} / {zones.length}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/60">Провалено зон:</span>
                <span className="font-bold text-red-400">{failedZones.length}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/60">Уровень воды:</span>
                <span className={`font-bold ${waterLevel > 60 ? "text-red-400" : "text-green-400"}`}>{waterLevel}%</span>
              </div>
            </div>

            <button
              onClick={() => setModalState("none")}
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              Закрыть результаты
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          overflow: hidden;
          background: #03172c;
        }

        .island-map {
          position: fixed;
          inset: 0;
          overflow: hidden;
          isolation: isolate;
          color: white;
          background: #03172c;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ocean {
          position: absolute;
          inset: -10%;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 40% 48%, #12647b 0%, transparent 45%),
            radial-gradient(ellipse at 15% 20%, #075078 0%, transparent 40%),
            linear-gradient(145deg, #031a36, #06466b 55%, #03182f);
        }

        .ocean-light {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 40% 50%, transparent 15%, #00152a 95%);
        }

        .ocean-waves {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          opacity: 0.2;
          background-image: repeating-radial-gradient(ellipse at 40% 50%, transparent 0 34px, rgba(117, 218, 242, 0.45) 35px, transparent 37px, transparent 65px);
          animation: ocean-drift 35s linear infinite;
        }

        .ocean-waves-two {
          opacity: 0.12;
          transform: rotate(35deg) scale(1.2);
          animation-duration: 48s;
          animation-direction: reverse;
        }

        .ocean-shimmer {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          background-image: radial-gradient(ellipse, rgba(119, 223, 255, 0.8) 0 1px, transparent 2px);
          background-size: 95px 73px;
          animation: shimmer 7s ease-in-out infinite alternate;
        }

        @keyframes ocean-drift {
          from { transform: rotate(0deg) translate3d(0, 0, 0); }
          to { transform: rotate(360deg) translate3d(0, 0, 0); }
        }

        @keyframes shimmer {
          from { opacity: 0.1; }
          to { opacity: 0.35; }
        }

        @keyframes wave-move {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .reef {
          position: absolute;
          width: 200px;
          height: 80px;
          border: 2px solid rgba(76, 201, 220, 0.22);
          border-radius: 50%;
          transform: rotate(-25deg);
        }

        .reef-one { top: 15%; left: 4%; }
        .reef-two { right: 4%; top: 58%; transform: rotate(25deg); }
        .reef-three { bottom: 7%; left: 38%; transform: rotate(-10deg); }

        .island-stage {
          position: absolute;
          width: min(100vw, 150vh);
          aspect-ratio: 1200 / 760;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.4));
        }

        .island-art,
        .island-route {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .island-route {
          pointer-events: none;
          filter: drop-shadow(0 0 7px #168fff);
        }

        .zone-marker {
          position: absolute;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .zone-marker-locked { cursor: not-allowed; }
        .zone-marker-completed { cursor: default; }
        .zone-marker-failed { cursor: default; }

        .zone-marker-lock {
          display: flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          background: rgba(2, 18, 35, 0.6);
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.25s ease;
        }

        .zone-marker-locked .zone-marker-label {
          opacity: 0.4;
          border-color: transparent;
          background: transparent;
        }

        .zone-marker-completed-icon {
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 2px solid #39E875;
          border-radius: 50%;
          background: rgba(57, 232, 117, 0.2);
          color: #39E875;
          box-shadow: 0 0 15px rgba(57, 232, 117, 0.4);
          transition: all 0.25s ease;
        }

        .zone-marker-completed .zone-marker-label {
          border-color: rgba(57, 232, 117, 0.5);
          color: #39E875;
          opacity: 1;
        }

        .zone-marker-failed-icon {
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 2px solid #FF4C4C;
          border-radius: 50%;
          background: rgba(255, 76, 76, 0.2);
          color: #FF4C4C;
          box-shadow: 0 0 15px rgba(255, 76, 76, 0.4);
          transition: all 0.25s ease;
        }

        .zone-marker-failed .zone-marker-label {
          border-color: rgba(255, 76, 76, 0.5);
          color: #FF4C4C;
          opacity: 1;
        }

        .zone-marker-ring {
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(136, 201, 232, 0.7);
          border-radius: 50%;
          background: rgba(5, 28, 49, 0.9);
          box-shadow: 0 0 0 5px rgba(30, 123, 177, 0.13), 0 0 18px rgba(30, 151, 255, 0.3);
          transition: all 0.25s ease;
        }

        .zone-marker:hover:not(:disabled) .zone-marker-ring {
          transform: scale(1.1);
          border-color: #65d5ff;
          box-shadow: 0 0 0 7px rgba(38, 158, 255, 0.16), 0 0 25px rgba(27, 160, 255, 0.8);
        }

        .zone-marker-core {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7abce9;
          box-shadow: 0 0 10px #35aaff;
        }

        .zone-marker-label {
          max-width: 160px;
          padding: 5px 9px;
          border: 1px solid rgba(132, 202, 255, 0.2);
          border-radius: 6px;
          background: rgba(2, 18, 35, 0.8);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0.75;
          backdrop-filter: blur(8px);
        }

        .map-footer {
          position: absolute;
          left: 38px;
          bottom: 38px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: rgba(177, 218, 242, 0.4);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-align: left;
          z-index: 10;
        }

        @media (max-width: 1100px) {
          .island-widget {
            transform: scale(0.72);
            transform-origin: bottom right;
          }
        }

        @media (max-width: 700px) {
          .zone-marker-ring,
          .zone-marker-lock,
          .zone-marker-completed-icon,
          .zone-marker-failed-icon {
            width: 34px;
            height: 34px;
          }
          .zone-marker-label {
            max-width: 115px;
            overflow: hidden;
            font-size: 8px;
            text-overflow: ellipsis;
          }
          .map-footer { display: none; }
          .island-widget {
            transform: scale(0.6);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ocean-waves,
          .ocean-shimmer {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

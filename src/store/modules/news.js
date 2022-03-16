export default {
  namespaced: true,
  state: {
    currentPage: 1,
    totalPage: 3,
    news: {
      1: {
        0: {
          data: "10.12",
          title: "Большое интервью с Антоном Худобиным",
          pic: require("@/assets/img/news-12.jpg"),
          link:
            "https://www.championat.com/hockey/article-4204387-intervju-s-antonom-hudobinym--o-dallase-novom-sezone-nhl-pereezde-v-rossiju-nedoocenke-v-klubah-i-sbornoj.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
        1: {
          data: "04.12",
          title:
            "Российские звёзды не погаснут. 7 самых ярких молодых игроков нашего хоккея",
          pic: require("@/assets/img/news-10.jpg"),
          link:
            "https://www.championat.com/hockey/article-4203597-7-samyh-jarkih-molodyh-hokkeistov-iz-rossii--askarov-podkolozkin-michkov-i-drugie.html?utm_source=championat.com&utm_medium=landing&utm_campaign=baltika&utm_content=native&utm_term=native",
        },
        2: {
          data: "26.11",
          title: "Большое интервью с Сергеем Бобровским",
          pic: require("@/assets/img/news-10.jpg"),
          link:
            "https://www.championat.com/hockey/article-4196583-bolshoe-intervju-s-sergeem-bobrovskim--o-zhizni-vne-lda-vzgljadah-na-sobstvennuju-kareru.html",
        },
        3: {
          data: "27.11",
          title:
            "Главный тест для «Красной машины». Хроники великой Суперсерии – 1972",
          pic: require("@/assets/img/news-11.jpg"),
          link:
            "https://www.championat.com/hockey/article-4181327-kakoj-byla-velikaja-superserija-1972-mezhdu-sbornymi-sssr-i-kanady.html",
        },
        4: {
          data: "09.11",
          title: "Большое интервью с Андреем Василевским",
          pic: require("@/assets/img/news-4.jpg"),
          link:
            "https://www.championat.com/hockey/article-4176079-bolshoe-intervju-s-andreem-vasilevskim-o-kubke-stenli-operacii-i-igrah-za-salavat.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
      },
      2: {
        0: {
          data: "02.11",
          title: "Насколько хорошо ты знаешь<br> сборную России по хоккею?",
          pic: require("@/assets/img/news-hover.jpg"),
          link:
            "https://www.championat.com/hockey/article-4167497-istorija-sbornoj-rossii-po-hokkeju-luchshie-bombardiry-krupnye-pobedy-test-chempionata.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
        1: {
          data: "02.11",
          title: "Как проходили игры Кубка «Балтики»",
          pic: require("@/assets/img/news-2.jpg"),
          link:
            "https://www.championat.com/hockey/article-4172655-kak-prohodil-kubok-baltiki-po-hokkeju-istorija-turnira-sudba-sbornoj-buduschie-zvjozdy.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
        2: {
          data: "06.11",
          title:
            "Юкка Ялонен прокомментировал разгромное поражение в матче со сборной России",
          pic: require("@/assets/img/news-8.png"),
          link:
            "https://www.championat.com/hockey/news-4181995-jukka-jalonen-prokommentiroval-razgromnoe-porazhenie-v-matche-so-sbornoj-rossii-na-evroture.html",
        },
        3: {
          data: "02.11",
          title: "Как смотреть хоккей дома?<br> Инструкция для новичка",
          pic: require("@/assets/img/news-hover.jpg"),
          link:
            "https://www.championat.com/hockey/article-4172623-kak-smotret-hokkejnye-matchi-doma-pravila-igry-terminy-sovety-i-lajfhaki.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
        4: {
          data: "05.11",
          title: "Сборная России разгромила Финляндию на Кубке Карьяла",
          pic: require("@/assets/img/news-5.png"),
          link:
            "https://www.championat.com/hockey/news-4181685-sbornaja-rossii-razgromila-finljandiju-na-kubke-karjala-zabrosiv-shest-shajb.html",
        },
      },
      3: {
        0: {
          data: "05.11",
          title: "Ротенберг: матч с Финляндией был близок к идеальному",
          pic: require("@/assets/img/news-6.png"),
          link:
            "https://www.championat.com/hockey/news-4181753-rotenberg-s-tochki-zrenija-zhelanija-i-samootdachi-match-s-finljandiej-byl-blizok-k-idealnomu.html",
        },
        1: {
          data: "02.11",
          title:
            "«Быков напомнил России о рекордах<br> СССР». Как перед ЧМ-2008 вернулась<br> «Красная машина»",
          pic: require("@/assets/img/news-3.jpg"),
          link:
            "https://www.championat.com/hockey/article-4168277-sbornaja-rossii-vyigrala-vse-etapy-evrotura-v-sezone-20072008.html?utm_source=championat.com&utm_medium=mix&utm_campaign=baltika&utm_content=native&utm_term=landing",
        },
        2: {
          data: "05.11",
          title: "Ларионов: ребята сплотились и показали русский характер",
          pic: require("@/assets/img/news-9.png"),
          link:
            "https://www.championat.com/hockey/news-4181715-larionov--o-62-s-finljandiej-rebjata-splotilis-i-pokazali-russkij-harakter.html",
        },
        3: {
          data: "06.11",
          title:
            "Россия показала хоккей, похожий на тот, когда играла советская сборная в 80-е",
          pic: require("@/assets/img/news-7.png"),
          link:
            "https://www.championat.com/hockey/news-4181895-kozhevnikov-rossija-pokazala-hokkej-pohozhij-na-tot-kogda-igrala-sovetskaja-sbornaja-v-80-e.html",
        },
      },
    },
  },
  mutations: {
    NEXT_PAGE(state) {
      if (state.currentPage != state.totalPage) {
        state.currentPage++;
      }
    },

    PREV_PAGE(state) {
      if (state.currentPage != 1) {
        state.currentPage--;
      }
    },
  },
};
let data = [
    {
      id: 0,
      name: "綠島自由行套裝行程",
      imgUrl: "/assets/images/travel_1.png",
      area: "台北",
      description:
        "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。",
      group: 8,
      price: 1280,
      rate: 8.6,
      alt: "travel_1"
    },
    {
      id: 1,
      name: "清境高空觀景步道二日遊",
      imgUrl: "/assets/images/travel_4.png",
      area: "台北",
      description:
        "清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
      group: 12,
      price: 2580,
      rate: 8.2,
      alt: "travel_4"
    },
    {
      id: 2,
      name: "南庄度假村露營車二日遊",
      imgUrl: "/assets/images/travel_6.png",
      area: "台中",
      description: `南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！<br>
                          一泊一食，輕鬆享受露營車樂趣。獨立衛浴與私人戶外露臺。<br>
                          入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。`,
      group: 2,
      price: 2480,
      rate: 9.2,
      alt: "travel_6"
    },
    {
      id: 3,
      name: "山林悠遊雙人套票",
      imgUrl: "/assets/images/travel_3.png",
      area: "台中",
      description:
        " 山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。 （含雙龍瀑布入場券 x2）",
      group: "限時搶購",
      price: 880,
      rate: 9.3,
      alt: "travel_3"
    },
    {
      id: 4,
      name: "漁樂碼頭釣魚體驗套票",
      imgUrl: "/assets/images/travel_2.png",
      area: "台中",
      description:
        "台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！",
      group: 5,
      price: 1280,
      rate: 8.2,
      alt: "travel_2"
    },
    {
      id: 5,
      name: "熊森公園親子二日遊套票",
      imgUrl: "/assets/images/travel_5.png",
      area: "高雄",
      description:
        " 來自日本最受歡迎的兒童遊樂園《BearSon Park 熊森公園》，於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！",
      group: 3,
      price: 2480,
      rate: 8.6,
      alt: "travel_5"
    }
  ];
  
  // 下拉選單篩選套票
  const cardList = document.querySelector(".card-list");
  const searchNum = document.querySelector(".search-num");
  const cantFindArea = document.querySelector(".cantFind-area");
  
  const renderCard = (data) => {
    let template = "";
    data.forEach((item) => {
      template += `
          <li class="col mb-5">
                      <a href="#" class="card rounded-1 shadow border-0 position-relative">
                        <div class="tag z-3 position-absolute start-0 fs-5 py-2 px-4 text-white bg-secondary rounded-end">
                          ${item.area}
                        </div>
                        <div class="card-img overflow-hidden">
                          <img src="${
                            item.imgUrl
                          }" class="travel-card-img w-100" alt="${item.alt}">
                        </div>
                        <div class="card-body position-relative">
                          <div class="tag z-3 position-absolute start-0 py-1 px-2 text-white bg-primary rounded-end">
                            ${item.rate}
                          </div>
                          <h2 class="card-title fs-4 text-primary travel-border p-1">
                          ${item.name}
                          </h2>
                          <p class="card-text mt-4">
                          ${item.description}
                          </p>
                        </div>
                        <div class="info px-3 pb-3 d-flex align-items-center justify-content-between">
                          <div class="info-num d-flex align-items-center">
                            <span class="material-symbols-outlined icon-size me-6 text-primary">
                              info
                            </span>
                        <span class="text-primary fw-medium">
                           ${
                             typeof item.group === "number"
                               ? `剩下最後${item.group}組`
                               : item.group
                           }
                        </span>
                          </div>
                          <div class="info-price d-flex align-items-center">
                            <span class="text-primary me-1">TWD</span>
                            <span class="text-primary fs-2 fw-medium">$${item.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </a>
                    </li>`;
    });
    searchNum.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
    cardList.innerHTML = template;
  };
  
  renderCard(data);
  
  // 初次渲染列表
  if (data.length > 0) {
    cantFindArea.style.display = "none";
  }
  const searchArea = document.querySelector(".search-area");
  searchArea.addEventListener("change", (event) => {
    const area = event.target.value;
    let filterArray = [];
    if (area !== "全部地區") {
      filterArray = data.filter((item) => item.area === area);
    } else {
      filterArray = [...data];
    }
  
    if (filterArray.length > 0) {
      cantFindArea.style.display = "none";
    } else {
      cantFindArea.style.display = "block";
    }
    renderCard(filterArray);
  });
  
  // 新增套票
  const ticketName = document.querySelector("#ticket-name");
  const picture = document.querySelector("#picture");
  const area = document.querySelector("#area");
  const ticketPrice = document.querySelector("#ticket-price");
  const ticketNum = document.querySelector("#ticket-num");
  const ticketStar = document.querySelector("#ticket-star");
  const ticketDesc = document.querySelector("#ticket-desc");
  const ticketForm = document.querySelector(".ticket-form");
  const formBtn = document.querySelector(".form-btn");
  
  const addTicket = (data) => {
    let obj = {
      id: data.length,
      name: ticketName.value.trim(),
      imgUrl: picture.value.trim(),
      area: area.value.trim(),
      price: +ticketPrice.value.trim(),
      group: ticketNum.value.trim(),
      rate: ticketStar.value.trim(),
      description: ticketDesc.value.trim()
    };
    data.push(obj);
    console.log(obj);
  
    renderCard(data);
    searchArea.value = "";
    ticketForm.reset();
  };
  
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTicket(data);
    if (data.length > 0) {
      cantFindArea.style.display = "none";
    }
  });
  
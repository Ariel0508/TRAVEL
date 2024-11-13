import axios from "axios";
let data = [];
let totalObj = {};
const api = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json'
const getData = async () => {
  try {
    const res = await axios.get(api);
    data = res.data;
    // 篩選地區，並累加數字上去 
    data.forEach(item => { 
      totalObj[item.area] = (totalObj[item.area] || 0) + 1;
    });
    updateChart();
    renderCard();
  } catch (error) {
    console.error("資料獲取失敗:", error);
    throw new Error("資料獲取失敗");
  }
}
getData()
const updateChart = () => {
  const newData = Object.entries(totalObj);
  // 將 newData 丟入 c3 產生器
  c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: "donut"
    },
    size: {
      width: 200
    },
    color: {
      pattern: ["#26C0C7", "#5151D3", "#E68618"]
    },
    donut: {
      title: "套票地區比重",
      width: 20,
      label: {
        show: false
      }
    }
  });
}
  // 下拉選單篩選套票
  const cardList = document.querySelector(".card-list");
  const searchNum = document.querySelector(".search-num");
  const cantFindArea = document.querySelector(".cantFind-area");
  
  const renderCard = (filterData = data) => {
    let template = "";
    filterData.forEach((item) => {
      template += `
          <li class="col mb-5">
                      <a href="#" class="card rounded-1 shadow border-0 position-relative">
                        <div class="tag z-3 position-absolute start-0 fs-5 py-2 px-4 text-white bg-secondary rounded-end">
                          ${item.area}
                        </div>
                        <div class="card-img overflow-hidden">
                          <img src="${item.imgUrl}" class="travel-card-img w-100" alt="${item.alt}">
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
    console.log(filterData.length);
        
    cantFindArea.style.display = filterData.length > 0 ? "none" : "block";
    searchNum.innerHTML = `本次搜尋共 ${filterData.length} 筆資料`;
    cardList.innerHTML = template;
  };
  

  const searchArea = document.querySelector(".search-area");
  searchArea.addEventListener("change", (event) => {
    const area = event.target.value;
    let filterArray = [];
    if (area !== "全部地區") {
      filterArray = data.filter((item) => item.area === area);
    } else {
      filterArray = [...data];
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

  const checkValue = () => {
    const constraints = {
      套票名稱: {
        presence: {
          // ^不加上預設欄位的名稱
          message: "必填欄位"
        }
      },
      圖片網址: {
        presence: {
          message: "是必填欄位"
        },
        url: {
          schemes: ["http", "https"],
          message: "必須是正確的網址"
        }
      },
      套票金額: {
        presence: {
          message: "是必填欄位"
        },
        numericality: {
          greaterThan: 0,
          message: "必須大於 0"
        }
      },
      套票組數: {
        presence: {
          message: "是必填欄位"
        },
        numericality: {
          greaterThan: 0,
          message: "必須大於 0"
        }
      },
      套票星級: {
        presence: {
          message: "是必填欄位"
        },
        numericality: {
          greaterThanOrEqualT: 1,
          lessThanOrEqualTo: 10, 
          message: "必須為 1-10 之間的數字"
        }
      }
    };
    const errors = validate(ticketForm, constraints);
    if(errors){
      const errorAry = Object.keys(errors);
      errorAry.forEach((item) => {
        const message = document.querySelector(`[data-message="${item}"]`);
        message.textContent = errors[item][0];
      })
    }
    return errors
  }

  const inputs = document.querySelectorAll("input[type=text], input[type=number],textarea");
  inputs.forEach(item => { 
    item.addEventListener('change', () => {
      item.nextElementSibling.textContent = "";
      checkValue();
    })
  })


  const addTicket = () => {
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
    // 驗證表單欄位
    checkValue();
     if (checkValue()) return;
    data.push(obj);
    // 更新 totalObj 
    totalObj[obj.area] = (totalObj[obj.area] || 0) + 1;
     // 更新圖表 
    updateChart();
    renderCard(data);
    searchArea.value = "";
    ticketForm.reset();
    alert("新增成功");
  };
  
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTicket();
  });
  
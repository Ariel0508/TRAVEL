import axios from "axios";
let data = [];
const api = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
const getData = async () => {
  try {
    const res = await axios.get(api);
    data = res.data.data
    renderCard(data);
  } catch (error) {
    console.error("資料獲取失敗:", error);
    throw new Error("資料獲取失敗");
  }
}
getData()

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
    if (data.length > 0) {
      cantFindArea.style.display = "none";
    } else {
      cantFindArea.style.display = "block";
    }
    searchNum.innerHTML = `本次搜尋共 ${data.length} 筆資料`;
    cardList.innerHTML = template;
  };
  
// 地區搜尋 value="" 時沒顯示資料
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
  // 顯示錯誤消息的函數 
  const showError = (input, message) => { 
    clearError(input); 
    const errorMsg = document.createElement('div'); 
    errorMsg.className = 'error-message'; 
    errorMsg.style.color = 'red'; 
    errorMsg.textContent = message; 
    input.insertAdjacentElement('afterend', errorMsg);
  };
    // 清除錯誤消息的函數 
    const clearError = (input) => { 
      const nextElement = input.nextElementSibling; 
      if (nextElement && nextElement.classList.contains('error-message')) { 
        nextElement.remove(); 
      } 
    };

  const validateForm = () => { 
    let isValid = true; 
    clearError(ticketName); 
    clearError(picture); 
    clearError(area); 
    clearError(ticketPrice); 
    clearError(ticketNum); 
    clearError(ticketStar); 
    clearError(ticketDesc); 
    if (ticketName.value.trim() === "") { 
      showError(ticketName, "請輸入套票名稱"); 
      isValid = false; 
    } if (picture.value.trim() === "") { 
      showError(picture, "請輸入圖片URL"); isValid = false; 
    } if (area.value.trim() === "請選擇景點地區") { 
      showError(area, "請選擇地區"); isValid = false; 
    } if (ticketPrice.value.trim() === "" || isNaN(ticketPrice.value) || ticketPrice.value <= 0) { 
      showError(ticketPrice, "請輸入有效的票價"); isValid = false; 
    } if (ticketNum.value.trim() === "" || isNaN(ticketNum.value) || ticketNum.value <= 0) { 
      showError(ticketNum, "請輸入有效的剩餘數量"); 
      isValid = false; 
    } if (ticketStar.value.trim() === "" || isNaN(ticketStar.value) || ticketStar.value < 0 || ticketStar.value > 10) { 
      showError(ticketStar, "請輸入0到10之間的評分"); 
      isValid = false; 
    } if (ticketDesc.value.trim() === "") { 
      showError(ticketDesc, "請輸入描述"); 
      isValid = false; } 
      return isValid;
  };
  const addTicket = (data) => {
    if (!validateForm()) return;
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
    renderCard(data);
    searchArea.value = "";
    ticketForm.reset();
    alert("新增成功");
  };
  
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTicket(data);
  });
  
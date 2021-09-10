const UIController = (() => {
  const Selectors = {
    grid: ".main__grid",
    cells: ".main__item",
    desc: ".popup__description",
    popup: ".popup",
    formSize: ".popup__formSize",
    formColor: ".popup__formColor",
    popupSize: ".popup__size",
    popupColor: ".popup__color",
    range: "#size",
    gridValue: ".popup__grid-value",
    color: "#color",
    colorValue: ".popup__color-value"
  }

  return {
    getSelectors: () => Selectors,
    setValues: () => {
      document.querySelector(Selectors.gridValue).textContent = document.querySelector(Selectors.range).value
      document.querySelector(Selectors.colorValue).textContent = document.querySelector(Selectors.color).value
    },
    createDivs: (n, color = "#000") => {
      const grid = document.querySelector(Selectors.grid)
      for (let i = 0; i < n * n; i++) {
        const div = document.createElement("div")
        div.classList.add("main__item")
        grid.style.gridTemplateColumns = `repeat(${n}, 1fr`
        grid.style.gridTemplateRows = `repeat(${n}, 1fr`
        grid.appendChild(div)
      }

      document.querySelectorAll(Selectors.cells).forEach(cell => {
        cell.addEventListener("mouseover", function () {
          this.style.backgroundColor = color
        })
        cell.addEventListener("click", function () {
          this.style.backgroundColor = "#fff"
        })
      })
    }
  }
})();

const App = ((ui) => {
  const selectors = ui.getSelectors()
  const mainBtns = document.querySelectorAll('button[type="button"]')
  const formSize = document.querySelector(selectors.formSize)
  const formColor = document.querySelector(selectors.formColor)
  const popup = document.querySelector(selectors.popup)
  const range = document.querySelector(selectors.range)
  const color = document.querySelector(selectors.color)

  const loadEventListeners = () => {
    mainBtns.forEach(btn => {
      btn.addEventListener("click", manageControls)
    })
    formSize.submitCell.addEventListener("click", setGrid)
    formColor.submitColor.addEventListener("click", setColor)
    popup.addEventListener("click", closePopup)
    range.addEventListener("change", getGridValue)
    color.addEventListener("change", getColorValue)
  }

  const manageControls = e => {
    const val = e.target.ariaLabel
    if (val !== "set size" && val !== "clear grid") {
      mainBtns.forEach(btn => {
        btn.classList.remove("active")
      })
    }

    if (val === "set size") {
      openSizeOption()
    } else if (val === "set color") {
      e.target.classList.add("active")
      openColorOption()
    } else if (val === "set random color") {
      e.target.classList.add("active")
      setRandomColor()
    } else if (val === "set color 10% black") {
      e.target.classList.add("active")
      setBlackishColor()
    } else {
      clearGrid()
    }
  }

  const openSizeOption = () => {
    popup.style.display = "flex"
    formSize.style.display = "flex"
    formColor.style.display = "none"
  }

  const openColorOption = () => {
    popup.style.display = "flex"
    formColor.style.display = "flex"
    formSize.style.display = "none"
  }

  const setRandomColor = () => {
    document.querySelectorAll(selectors.cells).forEach(cell => {
      cell.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      })
    })
  }

  const setBlackishColor = () => {
    document.querySelectorAll(selectors.cells).forEach(cell => {
      cell.addEventListener("mouseover", function () {
        // will work on this later
      })
    })
  }

  const clearGrid = () => {
    document.querySelectorAll(selectors.cells).forEach(cell => {
      cell.style.backgroundColor = "#fff"
    })
  }

  const setGrid = e => {
    e.preventDefault()
    popup.style.display = "none"
    ui.createDivs(formSize.size.value)
  }

  const setColor = e => {
    e.preventDefault()
    popup.style.display = "none"
    document.querySelectorAll(selectors.cells).forEach(cell => {
      cell.addEventListener("mouseover", function () {
        this.style.backgroundColor = formColor.color.value
      })
    })
  }

  const closePopup = e => {
    if (e.target.classList.contains("popup__close")) {
      popup.style.display = "none"
    }
  }

  const getGridValue = () => {
    document.querySelector(selectors.gridValue).textContent = range.value
  }

  const getColorValue = () => {
    document.querySelector(selectors.colorValue).textContent = color.value
  }

  return {
    init: () => {
      ui.createDivs(10)
      ui.setValues()
      loadEventListeners()
    }
  }
})(UIController)

App.init()
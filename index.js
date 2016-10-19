
var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')

var FONT        = 'Ubuntu, sans-serif'
var BLACK       = 'hsla(0,0%,0%,1)'
var WHITE       = 'hsla(0,0%,100%,1)'
var BLUE        = 'hsla(208,53%,32%,1)'
var PINK        = 'hsla(346,84%,61%,1)'
var YELLOW      = 'hsla(42,100%,70%,1)'
var GREEN       = 'hsla(164,95%,43%,1)'
var GREY        = 'hsla(30,100%,99%,1)'
var LIGHTGREY   = 'hsla(30,100%,99%,.4)'
var COLORS      = [GREEN, PINK, YELLOW, BLUE]


var links = [
  'https://fonts.googleapis.com/css?family=Ubuntu',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
            ]
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)
document.head.appendChild(fontAwesome)

minixhr('https://api.github.com/users/Philip15', startPage)
function startPage (data) {
  var data = JSON.parse(data)
  document.body.appendChild(template(data))
  activateScrollEffect(COLORS)
}

var css = csjs`
  body {
    text-align: center;
    background-color: ${GREEN};
    color: black;
    font-family: ${FONT}
  }
  h1 {
    margin-top: 1em;
    color: ${GREY};
    font-size: 4em;
    font-weight: bold;
    text-transform: uppercase;
  }
	h3 {
    color: ${GREY};
    font-size: 3em;
    margin-bottom: 3em;
  }
  img {
    margin-top: 3em;
    border: 5px solid ${GREY};
    border-radius: 50%;
    width: 15em;
  }
`

function template (data) {
  return yo`
    <div>
    	<img src="${data.avatar_url}">
      <h1>${data.name}</h1>
      <h3>${data.bio}</h3>
      ${portfolioComponent()}
  		${textboxComponent()}
  		${footerComponent()}
    </div>
  `
}


function portfolioComponent () {
	var css = csjs`
  	.portfolio {
      margin: 2em 0 2em 0;
      width: 100%;
    }
    .portfolioItem {
      width: 100%;
      padding-bottom: 200px;
    	background-color: ${BLUE};
      color: ${GREY};
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      transition: 2s;
    }
    .portfolioTitle {
      margin: 2em;
      padding: 0.5em;
      font-size: 3em;
      color: ${PINK};
      background-color: ${YELLOW};
      border-radius: 4px;
      border: 4px solid ${YELLOW};
      transition: 2s;
    }
    .portfolioBody {
      margin: 0 40% 0 0em;
      text-align: left;
      font-size: 1.2em;
      color: ${BLUE};
      transition: 2s;
    }
  `
  function template () {
    return yo`
    <div>
      <div class="${css.portfolio}">
        <div class="${css.portfolioItem}">
          <div class="${css.portfolioTitle}">
            Portfolio: My quiz app
          </div>
          <div class="${css.portfolioBody}">
            My quiz is a quiz app where users can answer
            Likert scale questions and compare their answers
            with others.
           </div>
        </div>
      </div>
    </div>
    `
  }

  var element = template()
  return element

}


function textboxComponent () {
  var css = csjs`
  .textbox {
    margin: 5em 25% 3em 25%;
    color: ${GREY};
    font-size: 2em;
    line-height: 1.5em;
    text-align: justify;
  }
  `

  function template () {
    return yo`
      <div>
        <div class="${css.textbox}">
        Hi, my name is Filip. I love programming.
        I enjoy making new things :)
        </div>
      </div>
    `
  }

  var element = template()
	return element
}

function footerComponent () {
	var css = csjs`
  	.container {
      display: flex;
      justify-content: center;
    }
    .icon {
      padding: 1em;
      font-size: 35px;
      color: ${GREY};
    }
    .icon:hover {
      opacity: 0.4;
    }
    `

  function template () {
    return yo`
    <div class="${css.container}">
      <a href="https://github.com/Philip15">
        <i class="${css.icon} fa fa-github" aria-hidden="true"></i>
      </a>
      <a href="mailto:computergeek406@gmail.com ">
        <i class="${css.icon} fa fa-envelope-o" aria-hidden="true"></i>
      </a>
      <a href="https://www.facebook.com/filip.janjic.925/">
       <i class="${css.icon} fa fa-facebook" aria-hidden="true"></i>
      </a>
    </div>
    `
  }

  var element = template()
  return element
}

function activateScrollEffect (COLORS) {
  var docHeight = document.body.offsetHeight
  var colorAreaHeight = docHeight/COLORS.length
  window.addEventListener("scroll", function(event) {
    var position = document.body.scrollTop
    var i = Math.floor(position/colorAreaHeight)
    var color    = COLORS[i]
    document.body.style.backgroundColor = color
    document.body.style.transition = "background-color 3s"
  })
}

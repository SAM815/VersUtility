console.log("Hello");
//9ce82e8c8145426799d4b607580500af



//Initialize the news API parameters
//let source = "bbc-news";
//let apiKey = '9ce82e8c8145426799d4b607580500af';

//GRAB THE news container
let newsAccordion = document.getElementById("newsAccordion");

//create a get request
const xhr = new XMLHttpRequest();
//xhr.open('GET','https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}', true)
xhr.open('GET', 'http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9ce82e8c8145426799d4b607580500af', true)


xhr.onload = function () {
    if (this.status === 200) {

        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newsHtml = "";
        articles.forEach(function(element, index){
            let news = `<div class="card">
            
            <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                        aria-expanded="true" aria-controls="collapse${index}">
                       Breaking news ${index+1}: ${element["title"]}
                    </button>
                </h2>
            </div>
            <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}" data-parent="#newsAccordion">
                <div class="card-body">
                ${element["description"]}. <a href="${element['url']}" target="_blank">Read more here</a>
                </div>
            </div>

         </div>  `

newsHtml += news;


        })
       newsAccordion.innerHTML = newsHtml;

    }


    else {
        console.log("Some error occured")
    }
}

xhr.send();

// need to add a filtering mechanism

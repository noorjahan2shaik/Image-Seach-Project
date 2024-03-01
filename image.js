const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchRes = document.getElementById("search-result");
const showMore = document.getElementById("show-more");
const p = document.getElementById("no-result");

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM content to be fully loaded

    // Set the value of the search box to an empty string
    document.getElementById("search-box").value = "";

    // Add any other initialization logic here if needed
});

let keyword="";
let page =1;
//const accessKey="hXqmW01QwvJH85ySjeA2q5qdswXhDfW-wCJ3XtD5YBE"
async function searchImages(e){
    e.preventDefault();
    const newkeyword=encodeURIComponent(searchBox.value);

    if (newkeyword !== keyword) {
        keyword=newkeyword;
        page=1;
        searchRes.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=hXqmW01QwvJH85ySjeA2q5qdswXhDfW-wCJ3XtD5YBE&per_page=12`;
    //console.log("Constructed URL:", url); 
    
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        
        if(results.length===0 && page==1)
        {
            p.innerText="SORRY...NO IMAGES";
            p.style.display="block";
            showMore.style.display="none";
        }
        else{
            p.style.display="none";
            console.log(data.results);
            results.map((result) =>{
                const image = document.createElement("img");
                image.src = result.urls.small;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";

                imageLink.appendChild(image);
                searchRes.appendChild(imageLink);
            })
            showMore.style.display="block";
        }
    }
async function loadImages(){
    page++;
    await searchImages(event);

}
searchForm.addEventListener("submit",searchImages);

showMore.addEventListener("click",loadImages);


/*async function searchImages(){
    try{
        let res = await axios.get(link);
        console.log(res);
    }
    catch(err){
        console.log("Error: ");
    }
}*/


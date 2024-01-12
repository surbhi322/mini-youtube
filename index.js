async function getdata()
{
    try {
        let res = await fetch("https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyCuQE_L3Ac84gDynBNShds26HKN9ie6ogo&chart=mostPopular&maxResults=20&part=snippet&regionCode=IN&videoCategoryId=2")

        let data = await res.json()
        console.log(data)
        display(data.items)
    } catch (error) {
        console.log(error)
    }
   
}

// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

getdata()
const display = (d)=>{
   console.log(d)
   document.getElementById("videos").textContent=""
   d.map((e)=>{

    let div1 = document.createElement("div")
    div1.setAttribute("id","singleVideo")

    // <iframe width="560" height="315" src="https://www.youtube.com/embed/WXuoYzyCAfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    let iframe = document.createElement("iframe")
   
    iframe.src=`https://www.youtube.com/embed/${e.id}`
    iframe.style.width="100%"
    iframe.style.height="200px"
    iframe.setAttribute("allowfullscreen", true)

    let title = document.createElement("h3")
    title.textContent=e.snippet.title
    title.style.fontFamily="sans-serif"

    let language = document.createElement("h4")
    language.textContent=e.snippet.channelTitle;

  

    

    div1.append(iframe,title,language)
    document.getElementById("videos").append(div1)




   })
}

async function data_search()
{
    try {
        let term = document.getElementById("search-box").value;
        let res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyAX5WmhCoRRo-Q2tIlzoSTvpQfXAgV3lPs&q=${term}&type=video&maxResults=50&part=snippet`
        );
  
        let data = await res.json();
        // console.log(data.items)
        display_search(data.items);
      } catch (error) {
        console.log(error);
      }


}

const display_search = (d)=>{
    console.log(d)
    
    document.getElementById("videos").textContent=""
    d.map((e)=>{
 


     
     let div1 = document.createElement("div")
     div1.setAttribute("id","singleVideo")
 
    
 
     
    let images = document.createElement("img")
    images.src=e.snippet.thumbnails.medium.url

    images.addEventListener("click", function()
    {
       
        let arr=[];
        arr.push(e.id.videoId)
        localStorage.setItem("id",JSON.stringify(arr))

         window.location.href="iframe.html"
        // document.getElementById("videos").textContent=""
        // let frame = document.createElement("iframe")
        // frame.setAttribute("id","frame")
        // frame.setAttribute("allowfullscreen","true")
        // frame.src=`https://www.youtube.com/embed/${e.id.videoId}`
      
        // document.getElementById("iframe").append(frame)
    })
     div1.append(images)
     document.getElementById("videos").append(div1)
    })
 }


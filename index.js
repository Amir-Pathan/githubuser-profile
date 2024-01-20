//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
(function(){


  getUser()

}())

let user ={}

let repos=[]



function getUser(name="amir-pathan"){

  let  url ='https://api.github.com/users/'

    fetch(url+name).then((res)=>{

       res.json().then((res)=>{

        user=res

        displayUser()

       })

    })


    fetch(url+name+'/repos').then((res)=>{

      res.json().then(res=>{

        repos=res

        displayRepos()

        pagination()

      })

    })

}

function displayUser(){

  console.log(user);

  let mainDiv = document.getElementById('user')

  mainDiv.innerText=""
 
  // image Div

  let fDiv=document.createElement('div')

  
  let img =document.createElement('img')

  img.src=user.avatar_url;
  
  img.classList.add('img')

  img.classList.add("rounded-circle","rounded","mx-auto",'d-block')

  fDiv.appendChild(img)


  // Other Details Div

  let sDiv = document.createElement('div')

  let name= document.createElement('h3')

  name.innerHTML=user.name

  name.id='name'

  sDiv.appendChild(name)


  let bio = document.createElement('div')

  bio.innerText=user.bio

  sDiv.appendChild(bio)

  let twitterName = document.createElement('h2')

  twitterName.innerText=user.twitter_username

  sDiv.appendChild(twitterName)


  let location = document.createElement('h6')

  location.innerText=user.location

  sDiv.appendChild(location)


  let gitHub=document.createElement('a')

  gitHub.href=user.html_url

  gitHub.innerText=user.html_url


  mainDiv.appendChild(fDiv)
  mainDiv.appendChild(sDiv)

  document.getElementById('github').append(gitHub)

let s =document.getElementById('select')

s.innerText=''

  let arr = [{
    title:'10 per page',
    value:10
  },
  {
    title:'20 per page',
    value:20
  },
  {
    title:'50 per page',
    value:50
  },
  {
    title:'100 per page',
    value:100
  },
]

  arr.forEach((i)=>{

    let opt = document.createElement('option')

    opt.innerText=i.title;

    opt.value=i.value

    s.appendChild(opt)

  })



}

let perPage = 10;

let start=0;


function displayRepos(){


  let s=perPage*start;;

  let end= s+perPage>repos.length?repos.length:s+perPage

  let repo= repos.slice(s,end)


  let mainDom= document.getElementById('repos')

  mainDom.innerText=''

  repo.forEach((i)=>{

    let div = document.createElement('div')

    div.id='rep'

    div.classList.add('card')

    let heading = document.createElement('h5')

    heading.innerText=i.name

    div.appendChild(heading)

    let description = document.createElement('p')

    description.innerText=i.description

    div.appendChild(description)

    fetch(i.languages_url).then((res)=>{

      let divLang=document.createElement('div')

      divLang.classList.add('d-flex','justify-content-between')

      res.json().then((res)=>{

        if(res!=null){


          let arr = Object.keys(res)

          arr.forEach((i)=>{

             let d = document.createElement('div')

             d.innerText=i;

             divLang.appendChild(d)

          })

        }
      })
      
      div.appendChild(divLang)

    })

    mainDom.appendChild(div)

  })

}


function handlePerPage(){

let val = document.getElementById('select').value;

perPage=Number(val)

displayRepos()

pagination()


}

function page(val){

  if(val>0){

    start=val-1

    displayRepos()

  }

   if(val==='prev'&&start!=0){

     start=start-1;

     displayRepos()

     return

   }

   let m =Math.ceil(repos.length/perPage)

  

   if(val==='next'&&start!==m-1){

    console.log(start,m);

     start=start+1

     displayRepos()

     return

   }

  
}


function pagination(){

  let m = document.getElementById('pagination')

  m.innerText=''

  let p = Math.ceil(repos.length/perPage)

  console.log(p);

  let prev = document.createElement('li')

  prev.classList.add('page-item')

  let a = document.createElement('a')

  a.innerText='previous'

  a.classList.add('page-link')

  m.appendChild(a)

   a.addEventListener('click',()=>page('prev'))

  for(let i=1;i<=p;i++){

    let li = document.createElement('li')

    li.classList.add('page-item')

  let a = document.createElement('a')

  a.innerText=i

  a.classList.add('page-link')

  a.addEventListener('click',()=>page(i))

    li.appendChild(a)

    m.append(a)



  }


  let b = document.createElement('a')

  b.innerText='next'

  b.classList.add('page-link')

  b.addEventListener('click',()=>page('next'))

  m.appendChild(b)

}

function searchUser(){

  let userName= document.getElementById('userName').value

  if(userName.length>0){

    getUser(userName)

  }

}
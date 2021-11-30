const apiUrl = "https://api.github.com/users";

// "https://api.github.com/users/username/repos"

const main = document.querySelector("#cards")
const search = document.querySelector("#search")
const form = document.querySelector('form')


//declaring a function to fetch data



function fetchData(username) {
    axios.get(apiUrl + '/' + username).then(Response => {
        console.log(Response.data)
        createCard(Response.data)
        // fetchRepos(user)
        

    })
}
//     .then(err => {
//     //    if(err) throw err
//     // if(err.Response.status ===404){
//     //     creatErrorCard("The username does not exist")
//     // }
       
// })


// data("Racheal777")

//  async function data(username){
//      try{
//     const response = await axios.get(apiUrl + '/' + username)
//     console.log(response)
//  } catch(e){
//     console.log(e)
// }
// }




const creatErrorCard = (message) => {

    const errorCard = `
    <div class = "profile-card">
    ${message}
    </div>`

    main.innerHTML = message
}


//function
function createCard(user){
    const userCard = `
         <section class="card">
            <img src=${user.avatar_url} alt="pic">

            <div class="texts">
            <h2>${user.name}</h2>


            <p>Full stack developer and online instructor, specializing in mostly js,
                 but also write Python, php and some other stuff
            </p>

            <ul>
                <li>${user.followers} Followers</li>
                <li>${user.following} Following</li>
                <li>${user.public_repos} Repos</li>
            </ul>

            <div class="links">
                
                
            </div>
        </section>`

 main.innerHTML = userCard
    
}

//Adding event listener
form.addEventListener("submit", (events) => {
    events.preventDefault();


    //the input is a value which we get by doing search.value
    const user = search.value
    
//if user exist, the fetch data of the user which contains the repos
    if(user){
        fetchData(user)
        fetchRepos(user)
    }
});



//function to fetch the repositories
function fetchRepos(users){
    axios.get("https://api.github.com/users" + '/' + users + '/repos').then(Response => {
        console.log(Response.data)
        displayRepos(Response.data)
    }).then(err => {
        console.log(err)
    })
}


//displaying the repos
function displayRepos(userRepo){
    const reposElement = document.querySelector(".links");


    userRepo.slice(0,6).forEach(repo => {
        const repoTag = document.createElement('a')
        repoTag.href = repo.html_url;
        repoTag.target = '_blank';
        repoTag.innerText = repo.name;

        reposElement.appendChild(repoTag)
        console.log(repo.url)
    })
}
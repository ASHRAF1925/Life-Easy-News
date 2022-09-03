// categories selection
const category_selection = () => {
    const categories = document.getElementById('category_selection');


    for (var child of categories.children) {

        child.addEventListener('click', (event) => {
            for (var child of categories.children) {

                child.classList.remove('active-nav');

            }

            event.target.classList.add('active-nav');
            console.log("hi hi")
            console.log(event.target.innerText)
            load_news(event.target.innerText)




        })
    }

}

// display categories
const display_categoris = (array) => {
    for (var value of array) {
        // console.log(value.category_name);
        const new_item = document.createElement('div');
        new_item.classList.add('text-center', 'px-4', 'text-center', 'my-2', 'py-2', 'rounded', 'mx-2', 'Category_item');
        new_item.innerHTML = `
        ${value.category_name}
        `
        const categories = document.getElementById('category_selection');
        categories.append(new_item);

    }
    category_selection();
}


// category loading 

const load_catergoris = () => {
    const category_container = document.getElementById('category_selection');
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => display_categoris(data.data.news_category))
        .catch(error => console.log(error))



}

load_catergoris();
// display news
const display_news = (array) => {
    for (var value of array) {
        console.log(value.title);
        console.log(value.details);
        console.log(value.image_url);
        console.log(value.thumbnail_url);
        console.log(value.total_view);
        console.log(value.author.name);
        console.log(value.author.published_date);
        console.log(value.author.img);



    }

}












// news loading 

const load_news = (category_id) => {
    //getting category_id
    let categoryID;

    const url1 = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url1)
        .then(res => res.json())
        .then(data => {
            for (var value of data.data.news_category) {
                console.log(value.category_id);
                if (value.category_name == category_id) {
                    categoryID = value.category_id;
                    console.log("category id found")
                    console.log(categoryID)
                    break;
                }

            }
            // news load
            console.log("in news")
            console.log(categoryID)
            const news_container = document.getElementById('news_container');
            const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`
            console.log(`https://openapi.programming-hero.com/api/news/category/${categoryID}`)
            fetch(url)
                .then(res => res.json())
                .then(data => display_news(data.data))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}





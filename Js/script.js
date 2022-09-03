// categories selection
const category_selection = () => {
    const categories = document.getElementById('category_selection');


    for (var child of categories.children) {

        child.addEventListener('click', (event) => {
            for (var child of categories.children) {

                child.classList.remove('active-nav');

            }

            event.target.classList.add('active-nav');

            toggleSpinner(true);

            load_news(event.target.innerText);




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
// spinner
const toggleSpinner = isloading => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove("d-none");
    }
    else {
        loader.classList.add("d-none");
    }
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
//function to truncate
function truncate(input) {
    if (input.length > 250) {
        return input.substring(0, 250) + ' ... ';
    }
    return input;
};

// display news
const display_news = (array) => {
    let news_title;
    let news_details;
    let news_thumbline;
    let news_image;
    let news_author;
    let news_author_image;
    let news_date;
    let news_views;
    let news_stars;
    let no_data = "No Data Available!"
    const news_container = document.getElementById('news_container');
    news_container.innerHTML = '';
    const total_news = document.getElementById('total_news');
    total_news.innerText = array.length;
    console.log("array length")
    console.log(array.length)
    for (var value of array) {
        console.log("    ");
        console.log("    ");
        console.log("    ");
        console.log(value.title);
        if (value.title != null) {
            news_title = value.title;
        }
        else {
            news_title = no_data;
        }
        console.log(value.details);
        if (value.details != null) {
            news_details = value.details;
            news_details = truncate(news_details);
        }
        else {
            news_details = no_data;
        }
        console.log(value.image_url);
        if (value.image_url != null) {
            news_image = value.image_url;
        }
        else {
            news_image = no_data;
        }

        console.log(value.thumbnail_url);
        if (value.thumbnail_url != null) {
            news_thumbline = value.thumbnail_url;
        }
        else {
            news_thumbline = no_data;
        }


        console.log(value.total_view);
        if (value.thumbnail_url != null) {
            news_thumbline = value.thumbnail_url;
        }
        else {
            news_thumbline = no_data;
        }
        console.log(value.author.name);
        if (value.author.name != null) {
            news_author = value.author.name;
        }
        else {
            news_author = no_data;
        }
        /////
        console.log(value.author.published_date);
        if (value.author.published_date != null) {
            news_date = value.author.published_date;
        }
        else {
            news_date = no_data;
        }
        //////
        console.log(value.author.img);
        if (value.author.img != null) {
            news_author_image = value.author.img;
        }
        else {
            news_author_image = no_data;
        }
        ///
        console.log(value.total_view);
        if (value.total_view != null) {
            news_views = value.total_view;
        }
        else {
            news_views = no_data;
        }

        console.log(value.rating.number);
        if (value.rating.number != null) {
            news_stars = value.rating.number;
        }
        else {
            news_stars = no_data;
        }
        console.log("    ");
        console.log("    ");
        console.log("    ");





        const new_item = document.createElement('div');
        new_item.classList.add('my-5', 'shadow', 'p-3', 'mb-5', 'rounded');

        new_item.innerHTML = `
        <div class="row">

            <div class="col-lg-4 col-sm-12 text-center  ">
                <img class="rounded img-fluid p-1 " src="${news_thumbline}"">
            </div>
            <div class="col-lg-8 col-sm-12 p-1 text-center">
                <h1>${news_title}</h1>
                <article>
                    <p class="news-article">
                    ${news_details}
                        
                    </p>

                </article>




                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <img src="${news_author_image}" alt="" width="60" height="60"
                            class="d-inline-block align-text-top bg-light rounded-circle  ">
                        <div>
                            <p>${news_author}</p>
                            <p>${news_date}</p>
                        </div>


                    </div>
                    <div class="d-flex">
                        <p>view : </p>
                        <p>${news_views}</p>

                    </div>
                    <div class="d-flex">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div class="me-3">
                        <i class="fa-sharp fa-solid fa-arrow-right"></i>

                    </div>
                </div>
            </div>
        </div>
        
        `

        news_container.append(new_item);





    }
    toggleSpinner(false);

}


// news loading 

const load_news = (category_id) => {
    //getting category_id
    let categoryID;
    const category = document.getElementById('news_category');

    const url1 = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url1)
        .then(res => res.json())
        .then(data => {
            for (var value of data.data.news_category) {
                console.log(value.category_id);
                if (value.category_name == category_id) {
                    category.innerText = value.category_name;
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





let default_sort = true;
let Most_sort = false;
let less_sort = false;
let selected_category = "Breaking News";


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
            selected_category = event.target.innerText;

            load_news(selected_category);




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

const load_catergoris = async () => {
    const category_container = document.getElementById('category_selection');
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        display_categoris(data.data.news_category);

    }
    catch (error) {
        console.log(error);

    }





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
    if (default_sort) {
        console.log("soritng default")

    }
    else if (Most_sort) {

        console.log("sorting most");
        array.sort((a, b) => {
            return b.total_view - a.total_view;
        });
        array.forEach((e) => {
            console.log(`${e.title}  ${e.total_view}`);
        });

    }
    else if (less_sort) {
        console.log("sorting least");
        array.sort((a, b) => {
            return a.total_view - b.total_view;
        });
        array.forEach((e) => {
            console.log(`${e.title}  ${e.total_view}`);
        });
    }



    console.log(array)
    let news_title;
    let news_details;
    let news_thumbline;
    let news_image;
    let news_author;
    let news_author_image;
    let news_date;
    let news_views;
    let news_stars;
    let news_id;
    let no_data = "No Data Available!"
    const news_container = document.getElementById('news_container');
    news_container.innerHTML = '';
    const total_news = document.getElementById('total_news');
    total_news.innerText = array.length;

    for (var value of array) {

        if (value._id != null) {
            news_id = value._id;
        }
        else {
            news_id = no_data;
        }


        if (value.title != null) {
            news_title = value.title;
        }
        else {
            news_title = no_data;
        }

        if (value.details != null) {
            news_details = value.details;
            news_details = truncate(news_details);
        }
        else {
            news_details = no_data;
        }

        if (value.image_url != null) {
            news_image = value.image_url;
        }
        else {
            news_image = no_data;
        }


        if (value.thumbnail_url != null) {
            news_thumbline = value.thumbnail_url;
        }
        else {
            news_thumbline = no_data;
        }


        if (value.thumbnail_url != null) {
            news_thumbline = value.thumbnail_url;
        }
        else {
            news_thumbline = no_data;
        }

        if (value.author.name != null) {
            news_author = value.author.name;
        }
        else {
            news_author = no_data;
        }
        /////

        if (value.author.published_date != null) {
            news_date = value.author.published_date;
        }
        else {
            news_date = no_data;
        }
        //////

        if (value.author.img != null) {
            news_author_image = value.author.img;
        }
        else {
            news_author_image = no_data;
        }
        ///

        if (value.total_view != null) {
            news_views = value.total_view;
        }
        else {
            news_views = no_data;
        }


        if (value.rating.number != null) {
            news_stars = value.rating.number;
        }
        else {
            news_stars = no_data;
        }

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

                                    <button onclick="load_details_news('${news_id}')" type="button"
                                        class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                            class="fa-sharp fa-solid fa-arrow-right"></i></button>


                     </div
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

                    break;
                }

            }

            // news load

            const news_container = document.getElementById('news_container');
            const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`

            fetch(url)
                .then(res => res.json())
                .then(data => display_news(data.data))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}
// modal operation
const load_details_news = async (id) => {
    console.log("loading modal");
    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    try {
        console.log("phone object")
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);

        let news_title;
        let news_details;
        let news_thumbline;
        let news_image;
        let news_author;
        let news_author_image;
        let news_date;
        let news_views;
        let news_stars;
        let news_id;
        let no_data = "No Data Available!"
        const modal_container = document.getElementById('modal-body-elements');
        modal_container.innerHTML = '';

        for (var value of data.data) {

            if (value._id != null) {
                news_id = value._id;
            }
            else {
                news_id = no_data;
            }


            if (value.title != null) {
                news_title = value.title;
            }
            else {
                news_title = no_data;
            }

            if (value.details != null) {
                news_details = value.details;

            }
            else {
                news_details = no_data;
            }

            if (value.image_url != null) {
                news_image = value.image_url;
            }
            else {
                news_image = no_data;
            }


            if (value.thumbnail_url != null) {
                news_thumbline = value.thumbnail_url;
            }
            else {
                news_thumbline = no_data;
            }


            if (value.thumbnail_url != null) {
                news_thumbline = value.thumbnail_url;
            }
            else {
                news_thumbline = no_data;
            }

            if (value.author.name != null) {
                news_author = value.author.name;
            }
            else {
                news_author = no_data;
            }
            /////

            if (value.author.published_date != null) {
                news_date = value.author.published_date;
            }
            else {
                news_date = no_data;
            }
            //////

            if (value.author.img != null) {
                news_author_image = value.author.img;
            }
            else {
                news_author_image = no_data;
            }
            ///

            if (value.total_view != null) {
                news_views = value.total_view;
            }
            else {
                news_views = no_data;
            }


            if (value.rating.number != null) {
                news_stars = value.rating.number;
            }
            else {
                news_stars = no_data;
            }

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
                   
                 
                </div>
            </div>
        </div>
        
        `

            modal_container.append(new_item);





        }


    }
    catch (error) {
        console.log(error);

    }

    console.log(id);
}
//sorting
document.getElementById('Default').addEventListener('click', () => {
    console.log("Deafaul selected");
    default_sort = true;
    Most_sort = false;
    less_sort = false;
    load_news(selected_category);
    document.getElementById("selected_sort").innerText = "Default "
})

document.getElementById('MostView').addEventListener('click', () => {
    console.log("MostView selected");
    default_sort = false;
    Most_sort = true;
    less_sort = false;
    load_news(selected_category);
    document.getElementById("selected_sort").innerText = "Most Viewed"
})

document.getElementById('lessView').addEventListener('click', () => {
    console.log("lessView selected");
    default_sort = false;
    Most_sort = false;
    less_sort = true;
    load_news(selected_category);
    document.getElementById("selected_sort").innerText = "Least Viewed"
})




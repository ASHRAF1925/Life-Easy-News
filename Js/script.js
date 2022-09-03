// category loading 

const load_catergoris = () => {
    const category_container = document.getElementById('category_selection');
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => display_categoris(data.data.news_category))
        .catch(error => console.log(error))



}
const display_categoris = (array) => {
    for (var value of array) {
        // console.log(value.category_name);
        const new_item = document.createElement('div');
        new_item.classList.add(" text-center px-4 text-center my-auto py-2 rounded Category_item  ");
        new_item.innerHTML = `
        ${value.category_name}
        `
        const categories = document.getElementById('category_selection');
        categories.append(new_item);

    }
}
load_catergoris();

// categories selection
const category_selection = () => {
    const categories = document.getElementById('category_selection');


    for (var child of categories.children) {

        child.addEventListener('click', (event) => {
            for (var child of categories.children) {
                console.log("removing clas")
                console.log(child)
                child.classList.remove('active-nav');
                console.log(child.classList)
            }

            event.target.classList.add('active-nav');
            console.log("woring")
            console.log(event.target)
            console.log(event.target.classList)


        })
    }

}
category_selection();

export const carousel = () => {

    let activeElement = 0;
    const timeChange = 4000;
    const colorImgHtml = document.querySelector('.color');
    const greyImagesHtml = document.querySelector('.grey');
    const colorImgHtml2 = document.querySelector('.color-2');
    const greyImagesHtml2 = document.querySelector('.grey-2');
    const h1Html = document.querySelector('.member h1');
    const h2Html = document.querySelector('.member h2');
    const h1Html2 = document.querySelector('.member h1.is-hidden');
    const h2Html2 = document.querySelector('.member h2.is-hidden');

    const colorImages =[colorImgHtml.src, colorImgHtml2.src];
    const greyImages =[greyImagesHtml.src, greyImagesHtml2.src];
    const names =[h1Html.textContent, h1Html2.textContent];
    const professions =[h2Html.textContent, h2Html2.textContent];

    function changeElement() {
        activeElement++;

        if(activeElement == colorImages.length) {
            activeElement = 0;
        }
        colorImgHtml.src = colorImages[activeElement];
        greyImagesHtml.src =greyImages[activeElement];
        h1Html.textContent = names[activeElement];
        h2Html.textContent = professions[activeElement];
    }
    
    setInterval(changeElement, timeChange);
}

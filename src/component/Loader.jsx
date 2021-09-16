const Loader = () => {
    return(
        <div className="loader animate__animated animate__fadeInUp" 
        key={0}
        >
            <img src="https://nekocatgato.up.seesaa.net/image/Corriendo_gato_L.gif" alt="走る猫" id="loadingImage"></img>
            <p>Loading ...</p>
        </div>
    );
}

// http://nekocatgato.seesaa.net/article/135946029.htmlさんの配布画像
export default Loader;
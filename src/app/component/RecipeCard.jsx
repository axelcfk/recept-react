import LikeButton from "./LikeButton"
import Rating from "./Rating"

export default function RecipeCard({name, ingredients, instruction, imgSrc = null}) {

  /* instructions och ingredients border kanske göras om till arrayer? */
  if (!name || !ingredients || !instruction ) { // remove ingredients and instruction? not used here? or store here to send to dynamic recipe page later in a Link?
    return (
    <div className="flex h-32">
      Missing recipe props...
    </div>
    )
  }

  return (
    <>
      <div className="flex h-52 flex-col justify-evenly gap-4">
        <figure className="mx-0 h-2/3"> {/* default 16px marginTop/Bot and 40px marginLeft/Right? */}
          <div className="flex h-full w-full">
            {imgSrc ? (<img src={imgSrc} alt="" className="h-full"/>) : (
             <img src="/spaghetti-bolognese.jpg" alt="" className="h-full"/> 
            )}

          </div>
          <div className="flex flex-col w-full">
            <figcaption>{name}</figcaption>
          </div>
          </figure>

          <div className="flex flex-col gap-4 h-1/3"> 

           {/*  <div className="flex flex-col w-full gap-4">
              <p>{ingredients}</p>
            </div>
            <div className="flex flex-col w-full gap-4">
              <p>{instructions}</p>
            </div> */}
            <div>
              <LikeButton/>
              <Rating/>

            </div>
            <div className="flex justify-between">
              <button>X</button>
             {/*  <button>Edit Recipe</button> */}

            </div>
          </div>
        


      </div>
    </>
  )
}
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
      <div className="flex flex-col h-72 w-44 justify-between pb-4 flex-shrink-0" style={{
        boxShadow:"0 0 3rem rgba(0, 0, 0, 0.2)"
      }}>
          <div className="flex h-32 w-full flex-col items-center justify-start">
            <div className="h-[90%] w-full">
              {imgSrc ? (<img src={imgSrc} alt="" className="w-full max-h-full object-cover"/>) : ( /* h-full */
              <img src="/spaghetti-bolognese.jpg" alt="" className="w-full max-h-full object-cover"/>  /* h-full */
              )}
            </div>

            <figcaption>{name}</figcaption>
          
            </div>
          <div className="flex flex-col gap-4 h-32 w-full justify-center items-center"> 
            <div className="flex flex-col w-fit items-center">
              <LikeButton/>
              <Rating/>

            </div>
            <div className="flex justify-between">
              <button>X</button>
             {/*  <button>Edit Recipe</button> */}

            </div>
          </div>
        


      </div>
  )
}
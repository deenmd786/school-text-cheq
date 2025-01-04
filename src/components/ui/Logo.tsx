import Image from "next/image"

const Logo = () =>{
    return(
        <div className="logo">
            <Image
        
          alt="EzPiZi logo"
          className="mx-auto mb-8"
          height={150}
          src="https://storage.googleapis.com/a1aa/image/FbtOeFIlClzBHiApSfzmQKHOX7k9LHZdG0Cwg2zbjY74MpBUA.jpg"
          width={150}
        />
        </div>
    )
}
export default Logo;
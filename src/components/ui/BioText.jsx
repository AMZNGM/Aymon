import personalInfo from '@/data/personal-info.json'

export default function BioText() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-9xl max-md:text-7xl font-black tracking-tighter leading-none backface-hidden uppercase">
          Who is {personalInfo.nickname}?
        </h1>
        <h2 className="text-2xl font-black tracking-tighter leading-none backface-hidden uppercase">I am {personalInfo.title}</h2>
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl font-black tracking-tighter leading-none backface-hidden uppercase">{personalInfo.bio}</p>
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-2xl font-black tracking-tighter leading-none backface-hidden uppercase">
          {personalInfo.firstName} {personalInfo.lastName}, born {personalInfo.birthYear}
          <br />
          Based in {personalInfo.location}
          <br />
          &ldquo;{personalInfo.slogan}&rdquo;
        </p>
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <a href={personalInfo.socialLinks.linkedin} className="text-lg font-black underline">
          LinkedIn
        </a>
        <a href={personalInfo.socialLinks.instagram} className="text-lg font-black underline">
          Instagram
        </a>
        <a href={personalInfo.socialLinks.behance} className="text-lg font-black underline">
          Behance
        </a>
      </div>

      <div className="flex flex-col justify-center items-center h-screen" />
    </>
  )
}

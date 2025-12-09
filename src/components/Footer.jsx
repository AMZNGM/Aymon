import personalInfo from '@/data/personal-info.json'
import VariableFontHoverByRandomLetter from './ui/text/VariableFontHoverByRandomLetter'

export default function Footer() {
  return (
    <footer className="relative w-screen h-[800px] bg-bg/50" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="sticky top-[calc(100vh-800px)] h-[800px]">
          <div className="flex justify-center items-center h-full w-full">
            <h4 className="text-[20rem] max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
              <VariableFontHoverByRandomLetter
                label={personalInfo.nickname}
                fromFontVariationSettings="'wght' 900, 'slnt' 0"
                toFontVariationSettings="'wght' 400, 'slnt' -10"
                className="z-10"
              />
            </h4>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import Navbar from '@/components/nav-components/Navbar'

export const generateMetadata = metadataGenerators.privacy

export default function PrivacyPolicy() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="flex max-lg:flex-col justify-between max-lg:overflow-hidden">
        <div className="sticky max-lg:fixed top-0 left-0 lg:h-dvh max-lg:w-dvw max-lg:z-999 z-10">
          <Navbar />
        </div>

        <div className="relative w-full h-full min-h-dvh max-md:mt-56">
          <section className="relative w-full min-h-dvh overflow-hidden rounded-2xl py-12 md:pe-12 ps-4 max-md:px-1">
            <div className="bg-bg/10 text-bg rounded-2xl">
              <div className="max-w-7xl mx-auto p-6">
                <AnimText as="h1" className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16">
                  Privacy Policy
                </AnimText>

                <div className="space-y-16 max-w-4xl">
                  <AnimIn as="section" className="space-y-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl max-md:text-2xl font-bold tracking-tighter">Our Commitment to Your Privacy</h2>
                      <p className="text-lg max-md:text-base text-bg/80 leading-relaxed">
                        Don&apos;t worry &ndash; I&apos;m not spying on you. I&apos;m too busy creating visuals, fixing keyframes, and
                        fighting with After Effects.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <AnimIn className="bg-bg/5 rounded-2xl p-6 space-y-4 border border-bg/10">
                        <h3 className="text-xl max-md:text-lg font-semibold">What We Actually Collect</h3>
                        <ul className="space-y-3 text-bg/70">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Basic analytics to see if anyone visits this website</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Absolutely zero personal secrets</span>
                          </li>
                        </ul>
                      </AnimIn>

                      <AnimIn className="bg-bg/5 rounded-2xl p-6 space-y-4 border border-bg/10">
                        <h3 className="text-xl max-md:text-lg font-semibold ">What We Don&apos;t Collect</h3>
                        <ul className="space-y-3 text-bg/70">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Your battery percentage</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Your FBI file</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Anything embarrassing in your camera roll (promise)</span>
                          </li>
                        </ul>
                      </AnimIn>
                    </div>
                  </AnimIn>

                  <AnimIn as="section" className="space-y-8">
                    <div className="bg-bg/5 rounded-2xl p-6 border border-bg/10">
                      <h3 className="text-xl max-md:text-lg font-semibold mb-4">Cookies & Technologies</h3>
                      <p className="text-bg/70 leading-relaxed">
                        Yes, the digital ones. They&apos;re just here to help the website run smoother, not to stalk you.
                      </p>
                    </div>

                    <div className="bg-bg/5 rounded-2xl p-6 border border-bg/10">
                      <h3 className="text-xl max-md:text-lg font-semibold mb-4">By using this website :</h3>
                      <p className="text-bg/70 leading-relaxed">You agree that you&apos;re awesome. That&apos;s it.</p>
                    </div>

                    <AnimIn delay={0.6} className="pt-8 border-t border-bg/20">
                      <p className="text-sm text-bg/50">
                        Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </AnimIn>
                  </AnimIn>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Suspense>
  )
}

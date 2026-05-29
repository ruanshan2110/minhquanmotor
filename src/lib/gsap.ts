type GsapModule = typeof import('gsap')
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')

type GsapRuntime = {
  gsap: GsapModule['gsap']
  ScrollTrigger: ScrollTriggerModule['ScrollTrigger']
}

let gsapRuntimePromise: Promise<GsapRuntime> | null = null

export function loadGsap() {
  gsapRuntimePromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([gsapModule, scrollTriggerModule]) => {
      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)

      return {
        gsap: gsapModule.gsap,
        ScrollTrigger: scrollTriggerModule.ScrollTrigger,
      }
    },
  )

  return gsapRuntimePromise
}

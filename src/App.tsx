import { IconBook, IconCards, IconPencil } from '@tabler/icons-react'
import './App.css'
import Footer from './components/footer'
import Navbar from './components/navbar'
import { useRef } from 'react'

function App() {
  const featuresRef = useRef(null)

  const handleEnter = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  console.log(
    '%cWelcome to HELL 😈\n%cHappy English Learning Lesson',
    'color:red;font-size:16px;font-weight:bold',
    'color:gray;font-size:12px'
  )

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero bg-base-200 min-h-screen flex-col">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold group">
              Welcome to <span className="text-primary">HELL</span>
              <span className="block text-xs opacity-0 group-hover:opacity-60 transition -mb-4">
                Happy English Learning Lesson
              </span>
            </h1>

            <p className="py-6 text-base-content/80">
              We take your English apart, correct it ruthlessly,
              and send it back stronger.
              <br />
              <span className="opacity-70">
                Improvement is not optional.
              </span>
            </p>

            <button
              className="btn btn-primary btn-wide"
              onClick={handleEnter}
            >
              Enter HELL
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        ref={featuresRef}
        className="w-full px-6 pt-16 pb-24 bg-base-100"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Awaits You
          </h2>
          <p className="text-center text-base-content/70 mb-12">
            Three tools. One outcome. Better English.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essay Generator */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title"><IconPencil /> Essay Generator</h3>
                <p className="text-base-content/80">
                  Feed us your ideas.
                  <br />
                  We return structure, clarity, and correctness.
                  <br />
                  Your grammar will not survive unchanged.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    Face Judgment
                  </button>
                </div>
              </div>
            </div>

            {/* Flashcards */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title"><IconCards /> Flashcards</h3>
                <p className="text-base-content/80">
                  Vocabulary. Grammar. Phrases.
                  <br />
                  Repeated until retention is inevitable.
                  <br />
                  HELL keeps score.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    Begin Training
                  </button>
                </div>
              </div>
            </div>

            {/* Dictionary */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title"><IconBook /> Dictionary</h3>
                <p className="text-base-content/80">
                  Definitions without excuses.
                  <br />
                  Usage without ambiguity.
                  <br />
                  Words, stripped to their meaning.
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">
                    Consult the Tome
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CREATOR */}
      <div className="px-6 py-24 bg-base-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            About the Creator
          </h2>
          <p className="text-base-content/80">
            Built by someone who struggled with English,
            got tired of vague feedback,
            and decided that improvement should be
            <span className="font-semibold"> systematic</span>,
            <span className="font-semibold"> honest</span>,
            and slightly intimidating.
          </p>
          <p className="mt-4 text-sm opacity-60">
            HELL is not cruel. It is thorough.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App

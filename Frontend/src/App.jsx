import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import Starfield from './components/Starfield'
import Intro from './components/Intro'
import RegisterModal from './components/RegisterModal'
import DisciplineModal from './components/DisciplineModal'
import EventDetailsModal from './components/EventDetailsModal'
import PolicyModal from './components/PolicyModal'
import { Navbar, Hero, About, Disciplines, Events, Leaders, CTA, Footer } from './components/Sections'
import { events } from './data/siteData'

export default function App() {
  const reduced = useReducedMotion()
  // Always start with intro/game active on reload, unless skipped in the current view
  const [intro, setIntro] = useState(true)

  const [registerModal, setRegisterModal] = useState(null)
  const [selectedDiscipline, setSelectedDiscipline] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedPolicy, setSelectedPolicy] = useState(null)

  const live = events.find((e) => e.status === 'live')

  const done = useCallback(() => {
    setIntro(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : ''
  }, [intro])

  return (
    <>
      <Starfield reduced={reduced} />

      <AnimatePresence>
        {intro && <Intro key="intro" onDone={done} reduced={reduced} />}
      </AnimatePresence>

      {!intro && (
        <>
          <Navbar live={!!live} onRegisterLive={() => setRegisterModal(live)} />
          <main>
            <Hero reduced={reduced} />
            <About />
            <Disciplines onSelectDiscipline={setSelectedDiscipline} />
            <Events
              onRegister={setRegisterModal}
              onSelectEvent={setSelectedEvent}
            />
            <Leaders />
            <CTA />
          </main>
          <Footer onSelectPolicy={setSelectedPolicy} />
          <button
            className="replay"
            onClick={() => setIntro(true)}
            aria-label="Replay intro & mini-game"
          >
            ↻ Play Game / Intro
          </button>
        </>
      )}

      {/* Interactive modals */}
      <AnimatePresence>
        {registerModal && (
          <RegisterModal
            event={registerModal}
            onClose={() => setRegisterModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDiscipline && (
          <DisciplineModal
            discipline={selectedDiscipline}
            onClose={() => setSelectedDiscipline(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onRegister={(ev) => {
              setSelectedEvent(null)
              setRegisterModal(ev)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPolicy && (
          <PolicyModal
            policyKey={selectedPolicy}
            onClose={() => setSelectedPolicy(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

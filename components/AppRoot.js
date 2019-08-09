import { useState, useRef, forwardRef } from 'react';
import Button from './Button';
import { useAuth } from '../context/auth-context';
import {
  useTransition,
  animated,
  config,
  useSpring,
  a,
  useChain
} from 'react-spring';
import ItemCard from './ItemCard';
import ListContainer from './ListContainer';
import TitleContainer from './TitleContainer';
import Textarea from 'react-textarea-autosize';
import useResizeAware from 'react-resize-aware';
import useMeasure from '../hooks/useMeasure';

function NewIdea({ handleIdeaClosed, handleIdeaSubmitted, isOpen }) {
  const [value, setValue] = useState('');

  function onChange(e) {
    setValue(e.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && value.trim().length > 0) {
      submitIdea(event);
    }

    if (event.key === 'Escape') {
      closeIdea(event);
    }
  }

  function submitIdea(event) {
    event.preventDefault();
    console.log(value);
    handleIdeaSubmitted(value);
    setValue('');
  }

  function closeIdea(event) {
    event.preventDefault();
    handleIdeaClosed();
    setValue('');
  }

  return (
    <ItemCard>
      <form onSubmit={submitIdea}>
        <Textarea
          autoFocus
          placeholder="My new idea..."
          value={value}
          onChange={onChange}
          onBlur={() => value.length === 0 && handleIdeaClosed()}
          onKeyDown={handleKeyPress}
          className="w-full resize-none p-1 border border-gray-300"
          tabIndex={isOpen ? '0' : '-1'}
        />
        <div className="flex flex-col flex items-end">
          <button onClick={submitIdea} tabIndex={isOpen ? '0' : '-1'}>
            Add idea
          </button>
          <button onClick={closeIdea} tabIndex={isOpen ? '0' : '-1'}>
            Cancel
          </button>
        </div>
      </form>
    </ItemCard>
  );
}

function AppRoot() {
  const { user, signOut } = useAuth();

  const [ideas, setIdeas] = useState([
    {
      title: 'Idea 1',
      id: 0
    },
    { title: 'Get the list working first', id: 1 },
    { title: 'Add styling', id: 2 }
  ]);

  const [isAddingIdea, setAddingIdea] = useState(false);

  const ideaTransitions = useTransition(ideas, idea => idea.id, {
    inital: { transform: 'translate3d(0%, 0%, 0)', opacity: 1 },
    from: { transform: 'translate3d(0%, -20%, 0)', opacity: 0 },
    enter: { transform: 'translate3d(0%, 0%, 0)', opacity: 1 },
    leave: { transform: 'translate3d(0%, 100%, 0)', opacity: 0 },
    trail: 400
  });

  const [bind, { height: viewHeight }] = useMeasure();

  const heightSpring = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isAddingIdea ? viewHeight : 0,
      opacity: isAddingIdea ? 1 : 0
    },
    config: config.stiff
  });

  function addIdea() {
    setAddingIdea(true);
  }

  function finishAddingIdea() {
    setAddingIdea(false);
  }

  function onIdeaSubmitted(idea) {
    console.log(idea);
    setIdeas(oldIdeas => {
      const myIdea = {
        title: idea,
        id: oldIdeas.length
      };
      return [myIdea, ...oldIdeas];
    });
  }

  return (
    <>
      {user && user.firstName && (
        <>
          <header className="bg-blue-300 p-2">
            <nav className="container mx-auto flex bg-blue-300 items-center justify-between ">
              <div>Idea Manager</div>
              <Button onClick={signOut}>Sign Out</Button>
            </nav>
          </header>
          <main className="container mx-auto">
            <div className="text-center">Welcome {user.firstName}!</div>
            <ListContainer>
              <TitleContainer>
                <h4>Ideas</h4>
                {!isAddingIdea && (
                  <button onClick={addIdea}>"+ Add New Idea"</button>
                )}
              </TitleContainer>
              <div>
                <animated.div
                  className="relative overflow-hidden"
                  style={{
                    ...heightSpring,
                    height: heightSpring.height
                  }}
                >
                  <a.div {...bind}>
                    <NewIdea
                      isOpen={isAddingIdea}
                      handleIdeaClosed={finishAddingIdea}
                      handleIdeaSubmitted={onIdeaSubmitted}
                    />
                  </a.div>
                </animated.div>
                {ideaTransitions.map(({ item, props, key }) => {
                  return (
                    <animated.div key={key} style={props}>
                      <ItemCard>{item.title}</ItemCard>
                    </animated.div>
                  );
                })}
              </div>
            </ListContainer>
          </main>
        </>
      )}
    </>
  );
}

export default AppRoot;

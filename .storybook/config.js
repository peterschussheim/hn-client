import { configure } from '@kadira/storybook';
import '../src/App.css'

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);

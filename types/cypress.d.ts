declare module '@cypress/code-coverage/task' {
  import { PluginEvents, PluginConfigOptions } from 'cypress';

  export default function registerCodeCoverageTasks(
    on: PluginEvents,
    config: PluginConfigOptions
  ): void;
}

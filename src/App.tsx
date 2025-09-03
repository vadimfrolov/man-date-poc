import { Container, Title, Space, Tabs } from '@mantine/core'
import { PriceDatePicker } from './components/PriceDatePicker'
import { AdvancedPriceDatePicker } from './components/AdvancedPriceDatePicker'
import { PriceDatePickerDemo } from './components/PriceDatePickerDemo'
import { AccessibilityInfo } from './components/AccessibilityInfo'
import { ScreenReaderTest } from './components/ScreenReaderTest'

function App() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        Accessible Price DatePicker Components
      </Title>
      
      <Tabs defaultValue="test" variant="outline">
        <Tabs.List grow>
          <Tabs.Tab value="test">Screen Reader Test</Tabs.Tab>
          <Tabs.Tab value="demo">Interactive Demo</Tabs.Tab>
          <Tabs.Tab value="advanced">Advanced Version</Tabs.Tab>
          <Tabs.Tab value="basic">Basic Version</Tabs.Tab>
          <Tabs.Tab value="accessibility">Accessibility Info</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="test" pt="md">
          <ScreenReaderTest />
        </Tabs.Panel>

        <Tabs.Panel value="demo" pt="md">
          <PriceDatePickerDemo />
        </Tabs.Panel>

        <Tabs.Panel value="advanced" pt="md">
          <AdvancedPriceDatePicker />
        </Tabs.Panel>

        <Tabs.Panel value="basic" pt="md">
          <PriceDatePicker />
        </Tabs.Panel>

        <Tabs.Panel value="accessibility" pt="md">
          <AccessibilityInfo />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default App

import { 
  Box, 
  Text, 
  Paper, 
  Stack, 
  Title, 
  List,
  ThemeIcon,
  Group,
  Badge
} from '@mantine/core'
import { 
  IconAccessible, 
  IconKeyboard, 
  IconVolume,
  IconEye,
  IconCheck
} from '@tabler/icons-react'

export function AccessibilityInfo() {
  return (
    <Stack gap="lg">
      <Paper p="lg" withBorder radius="md">
        <Group mb="md">
          <ThemeIcon variant="light" color="blue" size="lg">
            <IconAccessible size={20} />
          </ThemeIcon>
          <Title order={3}>Accessibility Features</Title>
        </Group>

        <Text mb="md" c="dimmed">
          Our custom datepicker components are designed with accessibility in mind, 
          ensuring that users with screen readers and keyboard navigation can fully 
          interact with the price information.
        </Text>

        <Stack gap="md">
          <Box>
            <Group mb="xs">
              <ThemeIcon variant="light" color="green" size="sm">
                <IconVolume size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm">Screen Reader Support</Text>
            </Group>
            <List size="sm" spacing="xs" ml="lg">
              <List.Item>
                <strong>Price Announcements:</strong> When focusing on a date, screen readers will announce 
                the full date, day of the week, price (if available), and demand level.
              </List.Item>
              <List.Item>
                <strong>Live Regions:</strong> Date selections are announced in real-time using ARIA live regions.
              </List.Item>
              <List.Item>
                <strong>Contextual Information:</strong> Screen readers provide context like "today", "selected", 
                and demand levels (low, medium, high, premium).
              </List.Item>
            </List>
          </Box>

          <Box>
            <Group mb="xs">
              <ThemeIcon variant="light" color="blue" size="sm">
                <IconKeyboard size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm">Keyboard Navigation</Text>
            </Group>
            <List size="sm" spacing="xs" ml="lg">
              <List.Item>
                <strong>Arrow Keys:</strong> Navigate between dates in the calendar.
              </List.Item>
              <List.Item>
                <strong>Enter/Space:</strong> Select a focused date.
              </List.Item>
              <List.Item>
                <strong>Tab:</strong> Move between calendar and other interactive elements.
              </List.Item>
              <List.Item>
                <strong>Focus Indicators:</strong> Clear visual focus indicators for keyboard users.
              </List.Item>
            </List>
          </Box>

          <Box>
            <Group mb="xs">
              <ThemeIcon variant="light" color="orange" size="sm">
                <IconEye size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm">Visual Accessibility</Text>
            </Group>
            <List size="sm" spacing="xs" ml="lg">
              <List.Item>
                <strong>Color Coding:</strong> Different price levels use distinct colors with sufficient contrast.
              </List.Item>
              <List.Item>
                <strong>Visual Indicators:</strong> Borders and background colors help identify price levels.
              </List.Item>
              <List.Item>
                <strong>Hover Effects:</strong> Interactive feedback for mouse users.
              </List.Item>
              <List.Item>
                <strong>Focus Styles:</strong> Clear focus rings for keyboard navigation.
              </List.Item>
            </List>
          </Box>
        </Stack>
      </Paper>

      <Paper p="md" withBorder radius="md" bg="green.0">
        <Group mb="sm">
          <ThemeIcon variant="light" color="green" size="sm">
            <IconCheck size={16} />
          </ThemeIcon>
          <Text fw={600} size="sm" c="green.8">WCAG 2.1 Compliance</Text>
        </Group>
        <Stack gap="xs">
          <Group>
            <Badge color="green" variant="light" size="sm">Level AA</Badge>
            <Text size="sm">Keyboard accessibility and focus management</Text>
          </Group>
          <Group>
            <Badge color="green" variant="light" size="sm">Level AA</Badge>
            <Text size="sm">Screen reader compatibility with ARIA labels</Text>
          </Group>
          <Group>
            <Badge color="green" variant="light" size="sm">Level AA</Badge>
            <Text size="sm">Color contrast ratios for visual elements</Text>
          </Group>
          <Group>
            <Badge color="green" variant="light" size="sm">Level AAA</Badge>
            <Text size="sm">Enhanced focus indicators and announcements</Text>
          </Group>
        </Stack>
      </Paper>

      <Paper p="md" withBorder radius="md" bg="blue.0">
        <Title order={4} mb="sm" c="blue.8">Testing with Screen Readers</Title>
        <Text size="sm" c="blue.7">
          To test accessibility features, try using a screen reader like NVDA (Windows), 
          JAWS (Windows), or VoiceOver (macOS). Navigate using only your keyboard and 
          listen to how the dates and prices are announced.
        </Text>
      </Paper>
    </Stack>
  )
}

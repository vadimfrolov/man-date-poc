import { useState } from 'react'
import { Box, Text, Paper, Stack, Title, Button, Alert } from '@mantine/core'
import { IconAccessible, IconInfoCircle } from '@tabler/icons-react'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'

// Simple price data for testing
const testPrices: Record<string, number> = {
  '2025-09-01': 100,
  '2025-09-02': 150,
  '2025-09-03': 200,
  '2025-09-04': 125,
  '2025-09-05': 175,
}

export function ScreenReaderTest() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [testMode, setTestMode] = useState<'standard' | 'accessible'>('standard')

  const getPrice = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    return testPrices[dateString]
  }

  const formatAccessibleLabel = (date: Date) => {
    const price = getPrice(date)
    const dayName = dayjs(date).format('dddd')
    const dateFormatted = dayjs(date).format('MMMM D, YYYY')
    const priceText = price ? `. Price $${price}` : '. No price available'
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    const todayText = isToday ? '. Today' : ''
    const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
    const selectedText = isSelected ? '. Selected' : ''
    
    return `${dayName}, ${dateFormatted}${priceText}${todayText}${selectedText}`
  }

  const getDayProps = (date: Date) => {
    if (testMode !== 'accessible') return {}
    
    return {
      'aria-label': formatAccessibleLabel(date),
      'data-price': getPrice(date) || 'none',
      title: formatAccessibleLabel(date),
    }
  }

  const renderDay = (date: Date) => {
    const price = getPrice(date)
    const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
    const isToday = dayjs(date).isSame(dayjs(), 'day')

    return (
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 2px',
          borderRadius: '4px',
          backgroundColor: isSelected 
            ? 'var(--mantine-primary-color-filled)' 
            : isToday 
            ? 'var(--mantine-color-blue-light)' 
            : 'transparent',
          color: isSelected ? 'white' : 'inherit',
          minHeight: '48px',
        }}
      >
        <Text size="sm" fw={isSelected || isToday ? 600 : 400}>
          {date.getDate()}
        </Text>
        {price && (
          <Text 
            size="xs" 
            c={isSelected ? 'white' : 'dimmed'}
            style={{ lineHeight: 1 }}
          >
            ${price}
          </Text>
        )}
      </Box>
    )
  }

  return (
    <Stack gap="lg">
      <Paper p="lg" withBorder>
        <Title order={3} mb="md">
          <IconAccessible size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Screen Reader Test
        </Title>

        <Alert icon={<IconInfoCircle size={16} />} mb="md">
          Use this component to test screen reader functionality. Toggle between standard and accessible modes 
          to see the difference. Use a screen reader (NVDA, JAWS, VoiceOver) and navigate with arrow keys.
        </Alert>

        <Box mb="md">
          <Button 
            variant={testMode === 'standard' ? 'filled' : 'outline'}
            onClick={() => setTestMode('standard')}
            mr="sm"
          >
            Standard Mode
          </Button>
          <Button 
            variant={testMode === 'accessible' ? 'filled' : 'outline'}
            onClick={() => setTestMode('accessible')}
          >
            Accessible Mode
          </Button>
        </Box>

        <Text size="sm" mb="md" c="dimmed">
          Current mode: <strong>{testMode === 'accessible' ? 'Accessible' : 'Standard'}</strong>
          {testMode === 'accessible' && ' - Screen readers will announce prices during navigation'}
        </Text>

        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          renderDay={renderDay}
          getDayProps={getDayProps}
          size="lg"
          aria-label={testMode === 'accessible' 
            ? "Accessible date picker with price information for each day" 
            : "Standard date picker"
          }
          style={{ width: '100%' }}
          styles={{
            day: {
              height: '48px',
              width: '48px',
            },
            monthCell: {
              padding: '2px',
            }
          }}
        />

        {selectedDate && (
          <Box mt="md" p="md" bg="gray.0" style={{ borderRadius: '8px' }}>
            <Text size="sm" c="dimmed">Selected Date Info:</Text>
            <Text fw={600}>{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</Text>
            {getPrice(selectedDate) && (
              <Text c="green" fw={600}>Price: ${getPrice(selectedDate)}</Text>
            )}
            {testMode === 'accessible' && (
              <Box mt="sm">
                <Text size="xs" c="blue">Screen Reader Label:</Text>
                <Text size="xs" style={{ fontStyle: 'italic' }}>
                  "{formatAccessibleLabel(selectedDate)}"
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      <Paper p="md" withBorder bg="yellow.0">
        <Title order={4} mb="sm">Testing Instructions</Title>
        <Stack gap="xs">
          <Text size="sm">1. Enable your screen reader (NVDA, JAWS, VoiceOver)</Text>
          <Text size="sm">2. Click "Accessible Mode" button</Text>
          <Text size="sm">3. Navigate to the calendar and use arrow keys to move between dates</Text>
          <Text size="sm">4. Listen for price announcements as you navigate</Text>
          <Text size="sm">5. Compare with "Standard Mode" to hear the difference</Text>
        </Stack>
      </Paper>
    </Stack>
  )
}

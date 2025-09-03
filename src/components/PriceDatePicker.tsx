import { useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { Box, Text, Paper, Group, Badge } from '@mantine/core'
import dayjs from 'dayjs'

// Mock price data for demonstration
const priceData: Record<string, number> = {
  '2025-09-01': 120,
  '2025-09-02': 135,
  '2025-09-03': 158,
  '2025-09-04': 142,
  '2025-09-05': 167,
  '2025-09-06': 189,
  '2025-09-07': 201,
  '2025-09-08': 178,
  '2025-09-09': 156,
  '2025-09-10': 145,
  '2025-09-11': 162,
  '2025-09-12': 188,
  '2025-09-13': 205,
  '2025-09-14': 223,
  '2025-09-15': 198,
  '2025-09-16': 176,
  '2025-09-17': 154,
  '2025-09-18': 167,
  '2025-09-19': 189,
  '2025-09-20': 212,
  '2025-09-21': 234,
  '2025-09-22': 201,
  '2025-09-23': 178,
  '2025-09-24': 165,
  '2025-09-25': 187,
  '2025-09-26': 209,
  '2025-09-27': 225,
  '2025-09-28': 198,
  '2025-09-29': 176,
  '2025-09-30': 183,
}

interface PriceDatePickerProps {
  onDateSelect?: (date: Date | null, price?: number) => void
}

export function PriceDatePicker({ onDateSelect }: PriceDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [announcement, setAnnouncement] = useState<string>('')

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    const price = date ? priceData[dayjs(date).format('YYYY-MM-DD')] : undefined
    onDateSelect?.(date, price)

    // Create announcement for screen readers
    if (date && price) {
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      setAnnouncement(`Selected ${dateFormatted}, price $${price}`)
    } else if (date) {
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      setAnnouncement(`Selected ${dateFormatted}, no price available`)
    }
  }

  const getDayProps = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    const price = priceData[dateString]
    const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
    const isToday = dayjs(date).isSame(dayjs(), 'day')

    // Create accessible label for screen readers
    const formatDateForScreenReader = (date: Date, price?: number) => {
      const dayName = dayjs(date).format('dddd')
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      const priceText = price ? `. Price $${price}` : '. No price available'
      const todayText = isToday ? '. Today' : ''
      const selectedText = isSelected ? '. Selected' : ''
      
      return `${dayName}, ${dateFormatted}${priceText}${todayText}${selectedText}`
    }

    return {
      'aria-label': formatDateForScreenReader(date, price),
      'data-price': price || 'none',
      title: formatDateForScreenReader(date, price),
    }
  }

  const renderDay = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    const price = priceData[dateString]
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

  const selectedPrice = selectedDate ? priceData[dayjs(selectedDate).format('YYYY-MM-DD')] : null

  return (
    <Box>
      {/* Live region for screen reader announcements */}
      <Box
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcement}
      </Box>

      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={500}>Select a Date</Text>
          {selectedDate && selectedPrice && (
            <Badge size="lg" color="green" variant="light">
              ${selectedPrice}
            </Badge>
          )}
        </Group>
        
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          renderDay={renderDay}
          getDayProps={getDayProps}
          size="lg"
          aria-label="Select date with price information"
          aria-describedby="basic-price-datepicker-description"
          style={{
            width: '100%',
          }}
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

        {/* Hidden description for screen readers */}
        <Box
          id="basic-price-datepicker-description"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Navigate through dates using arrow keys. Each date shows its price if available. 
          Press Enter or Space to select a date.
        </Box>
        
        {selectedDate && (
          <Box mt="md" p="sm" style={{ backgroundColor: 'var(--mantine-color-gray-light)', borderRadius: '4px' }}>
            <Group justify="space-between">
              <Text size="sm">
                Selected: {dayjs(selectedDate).format('MMMM D, YYYY')}
              </Text>
              {selectedPrice && (
                <Text size="sm" fw={600} c="green">
                  Price: ${selectedPrice}
                </Text>
              )}
            </Group>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

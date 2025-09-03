import { useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { 
  Box, 
  Text, 
  Paper, 
  Group, 
  Badge, 
  Stack,
  Flex,
  Title,
  ThemeIcon
} from '@mantine/core'
import { IconCalendar, IconCurrencyDollar } from '@tabler/icons-react'
import dayjs from 'dayjs'

// Extended mock price data with different price ranges
const generatePriceData = () => {
  const prices: Record<string, number> = {}
  const baseDate = dayjs('2025-09-01')
  
  for (let i = 0; i < 60; i++) {
    const date = baseDate.add(i, 'day')
    const dateString = date.format('YYYY-MM-DD')
    
    // Generate varying prices with some patterns
    let price = 100
    
    // Weekend premium
    if (date.day() === 0 || date.day() === 6) {
      price += 50 + Math.random() * 100
    } else {
      price += Math.random() * 80
    }
    
    // Holiday/special event premium (simulate some high-demand dates)
    if (i % 7 === 0) {
      price += Math.random() * 150
    }
    
    prices[dateString] = Math.round(price)
  }
  
  return prices
}

const priceData = generatePriceData()

interface AdvancedPriceDatePickerProps {
  onDateSelect?: (date: Date | null, price?: number) => void
}

export function AdvancedPriceDatePicker({ onDateSelect }: AdvancedPriceDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [announcement, setAnnouncement] = useState<string>('')

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    const price = date ? priceData[dayjs(date).format('YYYY-MM-DD')] : undefined
    onDateSelect?.(date, price)

    // Create announcement for screen readers
    if (date && price) {
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      const priceLevel = getPriceLevel(price)
      setAnnouncement(`Selected ${dateFormatted}, price $${price}, ${priceLevel} demand`)
    } else if (date) {
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      setAnnouncement(`Selected ${dateFormatted}, no price available`)
    }
  }

  const getPriceLevel = (price: number) => {
    if (price < 120) return 'low'
    if (price < 180) return 'medium'
    if (price < 220) return 'high'
    return 'premium'
  }

  const getPriceLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'green'
      case 'medium': return 'yellow'
      case 'high': return 'orange'
      case 'premium': return 'red'
      default: return 'gray'
    }
  }

  const getDayProps = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    const price = priceData[dateString]
    const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    const priceLevel = price ? getPriceLevel(price) : 'none'

    // Create comprehensive accessible label for screen readers
    const formatDateForScreenReader = (date: Date, price?: number, priceLevel?: string) => {
      const dayName = dayjs(date).format('dddd')
      const dateFormatted = dayjs(date).format('MMMM D, YYYY')
      const priceText = price ? `. Price $${price}` : '. No price available'
      const demandText = price && priceLevel !== 'none' ? `. ${priceLevel} demand` : ''
      const todayText = isToday ? '. Today' : ''
      const selectedText = isSelected ? '. Currently selected' : ''
      
      return `${dayName}, ${dateFormatted}${priceText}${demandText}${todayText}${selectedText}`
    }

    return {
      'aria-label': formatDateForScreenReader(date, price, priceLevel),
      'data-price': price || 'none',
      'data-price-level': priceLevel,
      title: formatDateForScreenReader(date, price, priceLevel),
    }
  }

  const renderDay = (date: Date) => {
    const dateString = dayjs(date).format('YYYY-MM-DD')
    const price = priceData[dateString]
    const isSelected = selectedDate && dayjs(date).isSame(selectedDate, 'day')
    const isHovered = hoveredDate && dayjs(date).isSame(hoveredDate, 'day')
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    const priceLevel = price ? getPriceLevel(price) : 'none'

    return (
      <Box
        onMouseEnter={() => setHoveredDate(date)}
        onMouseLeave={() => setHoveredDate(null)}
        onFocus={() => setHoveredDate(date)}
        onBlur={() => setHoveredDate(null)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 2px',
          borderRadius: '6px',
          backgroundColor: isSelected 
            ? 'var(--mantine-primary-color-filled)' 
            : isHovered
            ? 'var(--mantine-color-blue-light-hover)'
            : isToday 
            ? 'var(--mantine-color-blue-light)' 
            : 'transparent',
          color: isSelected ? 'white' : 'inherit',
          minHeight: '52px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          border: price && !isSelected ? `1px solid var(--mantine-color-${getPriceLevelColor(priceLevel)}-3)` : 'none',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          outline: 'none',
        }}
      >
        <Text 
          size="sm" 
          fw={isSelected || isToday ? 600 : 400}
          style={{ lineHeight: 1.2 }}
        >
          {date.getDate()}
        </Text>
        {price && (
          <Text 
            size="xs" 
            c={isSelected ? 'white' : getPriceLevelColor(priceLevel)}
            fw={500}
            style={{ lineHeight: 1 }}
          >
            ${price}
          </Text>
        )}
        {price && (
          <Box
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '20px',
              height: '2px',
              backgroundColor: isSelected 
                ? 'white' 
                : `var(--mantine-color-${getPriceLevelColor(priceLevel)}-5)`,
              borderRadius: '1px',
            }}
          />
        )}
      </Box>
    )
  }

  const selectedPrice = selectedDate ? priceData[dayjs(selectedDate).format('YYYY-MM-DD')] : null
  const hoveredPrice = hoveredDate ? priceData[dayjs(hoveredDate).format('YYYY-MM-DD')] : null
  const displayPrice = hoveredPrice || selectedPrice

  return (
    <Stack gap="md">
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

      <Paper p="lg" withBorder radius="md" shadow="sm">
        <Group justify="space-between" mb="lg">
          <Flex align="center" gap="sm">
            <ThemeIcon variant="light" size="lg">
              <IconCalendar size={20} />
            </ThemeIcon>
            <Title order={3}>Select Your Date</Title>
          </Flex>
          
          {displayPrice && (
            <Flex align="center" gap="sm">
              <ThemeIcon 
                variant="light" 
                color={getPriceLevelColor(getPriceLevel(displayPrice))}
                size="lg"
              >
                <IconCurrencyDollar size={20} />
              </ThemeIcon>
              <Badge 
                size="lg" 
                color={getPriceLevelColor(getPriceLevel(displayPrice))} 
                variant="light"
                radius="md"
              >
                ${displayPrice}
              </Badge>
            </Flex>
          )}
        </Group>
        
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          renderDay={renderDay}
          getDayProps={getDayProps}
          size="lg"
          firstDayOfWeek={1} // Start week on Monday
          aria-label="Date picker with price information for each day"
          aria-describedby="price-datepicker-description"
          style={{ width: '100%' }}
          styles={{
            day: {
              height: '52px',
              width: '52px',
            },
            monthCell: {
              padding: '2px',
            },
            weekday: {
              fontSize: '12px',
              fontWeight: 600,
            }
          }}
        />

        {/* Hidden description for screen readers */}
        <Box
          id="price-datepicker-description"
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
          Navigate through dates using arrow keys. Each date shows its price and demand level. 
          Press Enter or Space to select a date. Use Tab to navigate to other elements.
        </Box>
        
        {selectedDate && (
          <Box 
            mt="lg" 
            p="md" 
            style={{ 
              backgroundColor: 'var(--mantine-color-gray-0)', 
              borderRadius: '8px',
              border: '1px solid var(--mantine-color-gray-3)'
            }}
          >
            <Group justify="space-between" align="center">
              <Box>
                <Text size="sm" c="dimmed">Selected Date</Text>
                <Text size="lg" fw={600}>
                  {dayjs(selectedDate).format('MMMM D, YYYY')}
                </Text>
                <Text size="xs" c="dimmed">
                  {dayjs(selectedDate).format('dddd')}
                </Text>
              </Box>
              
              {selectedPrice && (
                <Box ta="right">
                  <Text size="sm" c="dimmed">Price</Text>
                  <Text 
                    size="xl" 
                    fw={700} 
                    c={getPriceLevelColor(getPriceLevel(selectedPrice))}
                  >
                    ${selectedPrice}
                  </Text>
                  <Badge 
                    size="sm" 
                    color={getPriceLevelColor(getPriceLevel(selectedPrice))}
                    variant="dot"
                  >
                    {getPriceLevel(selectedPrice)} demand
                  </Badge>
                </Box>
              )}
            </Group>
          </Box>
        )}
      </Paper>

      {/* Price Legend */}
      <Paper p="md" withBorder radius="md">
        <Text size="sm" fw={600} mb="sm">Price Legend</Text>
        <Group gap="md">
          <Group gap="xs">
            <Box w={12} h={12} bg="green.5" style={{ borderRadius: '2px' }} />
            <Text size="xs">Low ($100-120)</Text>
          </Group>
          <Group gap="xs">
            <Box w={12} h={12} bg="yellow.5" style={{ borderRadius: '2px' }} />
            <Text size="xs">Medium ($120-180)</Text>
          </Group>
          <Group gap="xs">
            <Box w={12} h={12} bg="orange.5" style={{ borderRadius: '2px' }} />
            <Text size="xs">High ($180-220)</Text>
          </Group>
          <Group gap="xs">
            <Box w={12} h={12} bg="red.5" style={{ borderRadius: '2px' }} />
            <Text size="xs">Premium ($220+)</Text>
          </Group>
        </Group>
      </Paper>
    </Stack>
  )
}

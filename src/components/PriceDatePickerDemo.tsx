import { useState } from 'react'
import { Box, Text, Alert, Group, Badge, Stack } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { AdvancedPriceDatePicker } from './AdvancedPriceDatePicker'
import dayjs from 'dayjs'

export function PriceDatePickerDemo() {
  const [selectedInfo, setSelectedInfo] = useState<{
    date: Date | null
    price?: number
  }>({ date: new Date() })

  const handleDateSelect = (date: Date | null, price?: number) => {
    setSelectedInfo({ date, price })
  }

  return (
    <Stack gap="lg">
      <Alert icon={<IconInfoCircle size={16} />} title="Interactive Demo">
        Select any date to see the price and get real-time feedback. 
        Hover over dates to preview prices without selecting.
      </Alert>

      <AdvancedPriceDatePicker onDateSelect={handleDateSelect} />

      {selectedInfo.date && (
        <Box 
          p="md" 
          style={{ 
            backgroundColor: 'var(--mantine-color-blue-0)', 
            borderRadius: '8px',
            border: '1px solid var(--mantine-color-blue-3)'
          }}
        >
          <Group justify="space-between" align="center">
            <Box>
              <Text size="sm" c="blue" fw={600}>
                📅 Date Selected Event
              </Text>
              <Text size="lg">
                {dayjs(selectedInfo.date).format('MMMM D, YYYY')}
              </Text>
            </Box>
            
            {selectedInfo.price && (
              <Box ta="right">
                <Text size="sm" c="blue" fw={600}>
                  💰 Price Retrieved
                </Text>
                <Badge size="lg" color="blue" variant="light">
                  ${selectedInfo.price}
                </Badge>
              </Box>
            )}
          </Group>
        </Box>
      )}
    </Stack>
  )
}

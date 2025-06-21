import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export function TestRadio() {
  return (
    <RadioGroup className='space-y-2 cursor-pointer'>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">A</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">B</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="c" id="c" />
        <Label htmlFor="c">C</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="d" id="d" />
        <Label htmlFor="d">D</Label>
      </div>
    </RadioGroup>
  )
}

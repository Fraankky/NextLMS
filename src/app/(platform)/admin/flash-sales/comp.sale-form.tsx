"use client"

import React, { useActionState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from '@/generated/prisma';
import { createSaleAction } from './action.create-sale';

interface Props {
    courses: Course[];
}

export const SaleForm = ({courses }: Props) => {
    const [_, action, pending] = useActionState(createSaleAction, null)
  return (
    <form className="space-y-2" action={action}>
        <div>
          <Input
            type="number"
            name="amount"
            placeholder="New Amount"
            className="w-full"
          />
        </div>

        <div>
          <Select name="courseId">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Courses</SelectLabel>
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-courses" disabled>
                    No courses available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={pending} >
          Create Sale
        </Button>
      </form>
  )
}

"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import React from "react";

interface CollapsibleProps extends React.ComponentProps<typeof CollapsiblePrimitive.Root> {
  shouldBeOpen?: boolean;
}

function Collapsible({shouldBeOpen, ...props}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(shouldBeOpen);
  React.useEffect(() => { setIsOpen(shouldBeOpen)}, [shouldBeOpen]);

  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} open={isOpen} onOpenChange={setIsOpen} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

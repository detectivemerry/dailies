import React from 'react'

interface CommunityPageProps {
    params : {
        name : string
    }
}
export default function CommunityPage({params} : CommunityPageProps) {
  return (
    <div>welcome to the ${params.name} community!</div>
  )
}

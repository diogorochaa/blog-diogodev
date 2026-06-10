type JsonLdValue = Record<string, unknown>

export type JsonLdProps = {
  data: JsonLdValue | JsonLdValue[]
}

export const JsonLd = ({ data }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item) => (
        <script
          key={JSON.stringify(item)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

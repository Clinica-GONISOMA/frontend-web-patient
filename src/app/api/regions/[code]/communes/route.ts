// app/api/regions/[codigo]/commune/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const response = await fetch(`https://apis.digital.gob.cl/dpa/regiones/${code}/comunas`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('[ERROR FETCHING COMUNAS]', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching comunas' }), {
      status: 500,
    });
  }
}

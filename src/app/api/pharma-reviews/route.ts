import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create the review in the database using the correct model name
    const review = await prisma.pharmareview.create({
      data: {
        reviewerName: data.name,
        ideaRating: parseInt(data.ideaRating) || 0,
        liveTraceRating: parseInt(data.liveTraceRating) || 0,
        authenticationSecure: data.authenticationSecure || '',
        authenticationComment: data.authenticationComment || null,
        dashboardEffectiveness: parseInt(data.dashboardEffectiveness) || 0,
        improvementSuggestions: data.improvementSuggestions || null,
      },
    });

    return NextResponse.json(
      { success: true, reviewId: review.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reviews = await prisma.pharmareview.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

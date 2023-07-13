import { NextPageContext } from "next";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { isAddress } from "web3-validator";

import { getContributions, APIResponseError } from "~/lib/api";

import type { Contribution } from "~/lib/types";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import AddressSearch from "~/components/shared/AddressSearch";
import ContributionCard from "~/components/shared/ContributionCard";
import ReputationCard from "~/components/shared/ReputationCard";
import Box from "~/components/ui/Box";

interface ContributionsProps {
  address: string;
}

interface HeaderProps {
  address: string;
  isFetching: boolean;
  errors: APIResponseError[] | null;
}

interface ContributionListProps {
  contributions: Contribution[];
}

const HeaderWrapper = styled(Box, {
  display: "flex",
  flexDirection: "column",
  fontFamily: "$IBMPlexSans",
  color: "white",
  gap: "$16",
});

const HeaderTitle = styled("h1", {
  fontSize: "$42",
  fontWeight: "$bold",
});

const HeaderContent = styled("p", {
  fontSize: "$16",
});

const getHeaderContent = (
  isFetching: boolean,
  errors: APIResponseError[] | null,
  address: string,
) => {
  if (isFetching) return "Fetching...";
  if (errors) return errors.map((e) => e.message).join("\n");
  if (!address) return null;

  return (
    <>
      <strong>Address: </strong>
      {address}
    </>
  );
};

const ContributionsHeader = ({ isFetching, address, errors }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <HeaderTitle>Contributions</HeaderTitle>
      <HeaderContent>
        {getHeaderContent(isFetching, errors, address)}
      </HeaderContent>
    </HeaderWrapper>
  );
};

const ReputationHeader = ({ isFetching, errors }: HeaderProps) => {
  if (isFetching || errors) return null;

  return (
    <HeaderWrapper>
      <HeaderTitle>Reputation</HeaderTitle>
    </HeaderWrapper>
  );
};

const CardListWrapper = styled(Box, {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "$42 $16",
});

const ReputationList = () => {
  return (
    <CardListWrapper>
      <ReputationCard />
    </CardListWrapper>
  );
};

const ContributionList = ({ contributions }: ContributionListProps) => {
  return (
    <CardListWrapper>
      {contributions.map((c) => (
        <ContributionCard key={c.id} {...c} />
      ))}
    </CardListWrapper>
  );
};

const LayoutContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$42",
});

const ContentContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$30",
  color: "$white",
  fontFamily: "$IBMPlexSans",
});

export default function Contributions(props: ContributionsProps) {
  const { address } = props;
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState<APIResponseError[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors } = await getContributions(address);

      if (data) {
        setContributions(data.data);
      }

      if (errors) {
        setErrors(errors);
      }

      setIsFetching(false);
    };

    if (isAddress(address)) {
      fetchData();
    } else {
      setErrors([{ status: 401, message: "Invalid address" }]);
      setIsFetching(false);
    }
  }, [address]);

  return (
    <CenteredLayout>
      <LayoutContainer>
        <AddressSearch />
        <ContentContainer>
          <ReputationHeader
            isFetching={isFetching}
            errors={errors}
            address={address}
          />
          {!isFetching && <ReputationList />}
          <ContributionsHeader
            isFetching={isFetching}
            address={address}
            errors={errors}
          />
          {!isFetching && <ContributionList contributions={contributions} />}
        </ContentContainer>
      </LayoutContainer>
    </CenteredLayout>
  );
}

Contributions.getInitialProps = async (ctx: NextPageContext) => {
  const { address } = ctx.query;

  return {
    address,
  };
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { previousRoute: context.req.headers.referer ?? null },
  };
}
